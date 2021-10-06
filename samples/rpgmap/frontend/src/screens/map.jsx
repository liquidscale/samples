function MapView() {
  return (
    <div className='flex-auto'>
      <div>Image Layer</div>
      <div>Token Layer</div>
      <div>FoW Layer</div>
    </div>
  );
}

export default function Map({ match }) {
  return (
    <div className='flex flex-col flex-1'>
      <div className='flex-shrink-0'></div>
      <div className='flex w-1/2 mx-auto flex-1 min-h-full max-h-full border-4 border-blueGray-200 bg-blueGray-400'>
        <MapView />
      </div>
      <div className='flex-shrink-0'></div>
    </div>
  );
}
