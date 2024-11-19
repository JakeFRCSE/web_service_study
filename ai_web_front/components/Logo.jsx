import Image from 'next/image';
import Link from 'next/link';
import Styles from './Logo.module.css';

export default function Logo() {
    return (
        <Link className={Styles.Logo} href="https://pnu-aid.github.io/homepage/">
            <Image
                className={Styles.LogoImage}
                alt="aid_logo"
                width="30"
                height="30"
                src={`/aid_logo_vector.svg`}
            />
            <span className={'text-nowrap md:text-lg'}>AI Developer</span>
        </Link>
    );
}
