import loading from './loading.gif'

export default function LoadingSpin() {
  return (
    <div className='container text-center' style={{height:'500px'}}>
      <img style={{margin:"10rem auto"}} src={loading} alt="loading"  />
    </div>
  )
}
