import logo from './Holidaze-logo-dark.png'
export function Footer() {
    return (
    <footer className="text-center bg-darkGreen text-lightGreen">
        <img src={logo} alt="holidaze logo" className='size-40 m-auto' />
        <p>&copy; 2024 Holidaze. All rights reserved. Icons at <a href="https://icon-sets.iconify.design/" className='font-bold'>Iconify</a></p>
    </footer>
    );
}