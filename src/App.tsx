import React, { type ReactElement, useState } from 'react';
import './App.css';
import Carousel, { type CarouselItem } from './Carousel';

type IMGFlipResponse<T> = Readonly<{
  data?: T
  success?: boolean
  error_message?: string
}>;

type GetMemesResponse = Readonly<{
  memes: MemeList
}>;

type Meme = Readonly<{
  id: string
  box_count: number
  captions: number
  height: number
  name: string
  url: string
  width: number
}>;

type MemeList = readonly Meme[];

function App (): ReactElement {
  const [memeList, setMemeList] = useState<MemeList>([]);

  async function fetchMemes (): Promise<void> {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      if (response.ok) {
        const { data }: IMGFlipResponse<GetMemesResponse> = await response.json();
        setMemeList(data?.memes ?? []);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const carouselItems: readonly CarouselItem[] = memeList.map(({ id, url }: Meme) => { return { id, url }; });

  return (
    <>
      <div>
        <Carousel items={carouselItems} />
      </div>
      <button onClick={() => { void fetchMemes(); }}>Fetch Memes</button>
    </>
  );
}

export default App;
