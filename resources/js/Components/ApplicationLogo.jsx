import logo from '../../../public/assets/logo.png';
export default function ApplicationLogo({ expanded }) {
    return (
        <img
            src={logo}
            className={`overflow-hidden transition-all duration-150 ease-linear ${expanded ? 'w-32' : 'w-0'}`}
        />
    );
}
