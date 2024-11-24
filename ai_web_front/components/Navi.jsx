'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import Styles from './Navi.module.css'

export default function Navi() {
    const [currentSection, setCurrentSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let nearestSection = '';
            let minDistance = Number.MAX_SAFE_INTEGER;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const centerY = window.scrollY + window.innerHeight / 2;
                const distance = Math.abs(sectionTop + sectionHeight / 2 - centerY);

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestSection = section.id;
                }
            });

            setCurrentSection(nearestSection);
            // console.log(nearestSection);
        };

        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        const targetSection = document.getElementById(id);
        if (targetSection) {
            const navHeight = document.querySelector('nav')?.clientHeight || 0;
            const offsetTop = targetSection.offsetTop - navHeight - 30;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <header className={Styles.NavigationBar}>
            <nav className={Styles.Inner}>
                <Logo />
                <div className={Styles.Right}>
                    <menu className={Styles.Menu}>
                        <a
                            className={currentSection == 'about_us' ? 'font-bold' : ''}
                            onClick={(e) => handleLinkClick(e, 'about_us')}
                        >
                            맥도날드 리뷰 별점 예측 모델
                        </a>
                    </menu>
                </div>
            </nav>
        </header>
    );
}
