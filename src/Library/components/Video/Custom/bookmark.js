// const addBookmark = () => {
  //   const canvas = canvasRef.current;
  //   canvas.width = 160;
  //   canvas.height = 90;
  //   const ctx = canvas.getContext('2d');

  //   ctx.drawImage(
  //     playerRef.current.getInternalPlayer(),
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height
  //   );
  //   const dataUri = canvas.toDataURL();
  //   canvas.width = 0;
  //   canvas.height = 0;
  //   const bookmarksCopy = [...bookmarks];
  //   bookmarksCopy.push({
  //     time: playerRef.current.currentTime(),
  //     display: format(playerRef.current.currentTime()),
  //     image: dataUri,
  //   });
  //   setBookmarks(bookmarksCopy);
  // };

  // const currentTime =
  //   playerRef && playerRef.current ? playerRef.current.currentTime : '00:00';

{/* <div>
          {bookmarks.map((bookmark, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlsRef.current.style.visibility = 'visible';

                  setTimeout(() => {
                    controlsRef.current.style.visibility = 'hidden';
                  }, 1000);
                }}>
                <img crossOrigin="anonymous" src={bookmark.image} />
                <div>bookmark at {bookmark.display}</div>
              </div>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} />
      </div> */}