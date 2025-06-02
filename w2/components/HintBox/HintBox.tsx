"use client";

import styles from './HintBox.module.css';

export default function HintBox({ text }: { text: string }) {
    return (
        <>
            <div className={styles.hint}>
                💡 {text}
            </div>
        </>
    );
}
