import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import { ScanQrCode } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ScanQRCode() {
    const scannerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const delay = setTimeout(() => {
            const scanner = new Html5Qrcode('reader');
            html5QrCodeRef.current = scanner;

            scanner
                .start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: 300 },
                    (decodedText) => {
                        scanner.stop().then(() => {
                            scanner.clear();
                            setOpen(false);
                            router.visit(`/inventory/${decodedText}`);
                        });
                    },
                    (error) => console.warn(error),
                )
                .catch((err) => {
                    console.error('QR scanner error:', err);
                });
        }, 300);

        return () => {
            clearTimeout(delay);
            const scanner = html5QrCodeRef.current;

            if (scanner && scanner._isScanning) {
                scanner
                    .stop()
                    .then(() => scanner.clear())
                    .catch(() => {});
            }
        };
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => setOpen(true)}
                >
                    <ScanQrCode className="mr-2" />
                    QR search
                </Button>
            </DialogTrigger>
            <DialogContent className="w-96">
                <DialogTitle className="mb-2 flex justify-self-center text-xl font-bold">
                    Scan QR Code
                </DialogTitle>
                <div
                    id="reader"
                    ref={scannerRef}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                ></div>
            </DialogContent>
        </Dialog>
    );
}
