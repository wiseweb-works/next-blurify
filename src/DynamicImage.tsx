"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";

interface DynamicImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> { }

export default function DynamicImage({ src, ...props }: DynamicImageProps) {
    const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

    useEffect(() => {
        async function generateBlur() {
            try {
                const imageUrl = src as string;
                const { base64 } = await getPlaiceholder(imageUrl);
                setBlurDataURL(base64);
            } catch (err) {
                console.warn("Failed to generate blurDataURL:", err);
            }
        }

        generateBlur();
    }, [src]);

    return (
        <Image
            {...props}
            src={src}
            placeholder={blurDataURL ? "blur" : undefined}
            blurDataURL={blurDataURL || undefined}
        />
    );
}
