import headerLogo from '../assets/logo.jpg';

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="Reactfood logo" />
        <h1>Reactfood</h1>
      </div>
      <button className='header-cart'>
        <span>Cart()</span>
      </button>
    </header>
  )
}