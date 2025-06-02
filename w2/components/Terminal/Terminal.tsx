'use client';

import styles from './Terminal.module.css';
import { toast, Toaster } from "sonner"

export default function Terminal({ text }: { text: string }) {
    return (
        <>
        <Toaster/>
            <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                    <h2 className={styles.terminalTitle}>Terminal</h2>
                    <button className={styles.terminalButton} onClick={() => handleCopy(text)} >Copy</button>                    
                </div>
                {text}
            </div>
        </>
    );
}

function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
        toast.success('Copied to clipboard!', {
            description: 'The command has been copied to your clipboard.',
            duration: 2000,
        });
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}