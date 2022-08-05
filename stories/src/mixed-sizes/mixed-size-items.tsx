import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import React, { ReactElement, useState } from 'react';
import { quotes as initial } from '../data';
import QuoteList from '../primatives/quote-list';
import reorder from '../reorder';
import type { Quote } from '../types';

function getQuotes() {
  const large: Quote = {
    ...initial[0],
    // eslint-disable-next-line no-restricted-syntax
    content: Array.from({ length: 20 })
      .map(() => 'some really long text')
      .join(' '),
  };

  const quotes: Quote[] = [large, ...initial.slice(1)];
  return quotes;
}

export default function App(): ReactElement {
  const [quotes, setQuotes] = useState(() => getQuotes());
  const [isCombineEnabled, setIsCombineEnabled] = useState(false);
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    setQuotes(reorder(quotes, result.source.index, result.destination.index));
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <button
        type="button"
        onClick={() => setIsCombineEnabled((value) => !value)}
      >
        Combining <strong>{isCombineEnabled ? 'enabled' : 'disabled'}</strong>
      </button>
      <QuoteList quotes={quotes} isCombineEnabled={isCombineEnabled} />
    </DragDropContext>
  );
}
