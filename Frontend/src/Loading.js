import image from "./loading.gif";

function Loading() {
  return (
    <>
      <center>
        <img src={image} alt='Loading' className='loading' />
      </center>
      <br></br>
    </>
  );
}

export default Loading;
