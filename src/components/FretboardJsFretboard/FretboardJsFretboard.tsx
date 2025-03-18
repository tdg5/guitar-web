import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  FRETBOARD_MOUSE_AND_TOUCH_EVENT_NAMES,
  Fretboard,
  FretboardMouseOrTouchEventHandler,
  FretboardMouseOrTouchEventName,
  FretboardOptions,
  Position,
} from './FretboardJsProvider';

export type {
  Fretboard,
  FretboardMouseOrTouchEventHandler,
  FretboardMouseOrTouchEventName,
  FretboardOptions as FretboardJsOptions,
  FretboardSystem,
  FretboardSystemOptions,
  Position,
} from './FretboardJsProvider';

export type FretboardJsFretboardProps = {
  [key in FretboardMouseOrTouchEventName]?: FretboardMouseOrTouchEventHandler;
} & {
  positions?: Position[];
  fretboardOptions?: FretboardOptions;
};

const getEventHandlers = (props: FretboardJsFretboardProps) => {
  const handlers = new Map<FretboardMouseOrTouchEventName, FretboardMouseOrTouchEventHandler>();
  for (const eventName of FRETBOARD_MOUSE_AND_TOUCH_EVENT_NAMES) {
    const eventHandler = props[eventName];
    if (eventHandler) {
      handlers.set(eventName, eventHandler);
    }
  }
  return handlers;
};

function mapsAreEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  let testVal;
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, val] of map1) {
    testVal = map2.get(key);
    // In case of an undefined value, make sure the key actually exists.
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false;
    }
  }
  return true;
}

export function FretboardJsFretboard(props: FretboardJsFretboardProps) {
  const { positions } = props;
  const fretboardDivRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [fretboardOptions, setFretboardOptions] = useState(props.fretboardOptions);

  useEffect(() => {
    if (!_.isEqual(fretboardOptions, props.fretboardOptions)) {
      setFretboardOptions(props.fretboardOptions);
    }
  }, [props.fretboardOptions]);

  const createFretboard = () => {
    return new Fretboard({
      ...fretboardOptions,
      el: fretboardDivRef.current,
    });
  };

  const [fretboard, setFretboard] = useState(createFretboard);

  const eventHandlers = useRef<Map<FretboardMouseOrTouchEventName, FretboardMouseOrTouchEventHandler>>(null);

  const setDotsAndRender = () => {
    fretboard.setDots(positions ?? []).render();
    if (!isRendered) {
      setIsRendered(true);
    }
  };

  useEffect(setDotsAndRender, [fretboard, positions]);

  function reset() {
    fretboard.removeEventListeners();
    if (fretboardDivRef.current) {
      fretboardDivRef.current.innerHTML = '';
    }
    eventHandlers.current = null;
    setIsRendered(false);
  }

  useEffect(() => {
    if (!isRendered) {
      return;
    }

    const handlers = getEventHandlers(props);
    if (eventHandlers.current === null || !mapsAreEqual(handlers, eventHandlers.current)) {
      eventHandlers.current = handlers;
      replaceEventHandlers();
    }
  }, [props, isRendered]);

  function replaceEventHandlers() {
    fretboard.removeEventListeners();

    if (eventHandlers.current === null) {
      return;
    }

    for (const [eventName, eventHandler] of eventHandlers.current.entries()) {
      fretboard.on(eventName, eventHandler);
    }
  }

  const reinitializeFretboard = () => {
    reset();
    setFretboard(createFretboard());
    setDotsAndRender();
  };

  useEffect(reinitializeFretboard, [fretboardOptions]);

  return <div ref={fretboardDivRef} />;
}
