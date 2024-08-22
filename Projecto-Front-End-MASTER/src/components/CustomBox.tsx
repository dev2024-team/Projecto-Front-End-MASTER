import Link from "next/link";
import React from "react";
import { useState } from "react";

const CustomBox = ({ text,url }: { text: string, url:string }) => {
    const [hover, setHover] = useState(false);
    return (
        <Link href={url} className='flex items-center justify-center hover:underline-offset-2'>
            <div
                style={{
                    width: '350px',
                    height: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc', // Opcional: Adiciona uma borda para visualização
                    borderRadius: '8px', // Opcional: Arredonda os cantos da div
                    backgroundColor: hover ? '#e0e0e0' : '#f5f5f5', // Muda a cor ao passar o mouse
                    transition: 'background-color 0.3s', // Suaviza a transição da cor
                    margin: '30px'
                }}
                onMouseEnter={() => setHover(true)} // Quando o mouse entra na div
                onMouseLeave={() => setHover(false)} // Quando o mouse sai da div
            >
                <p style={{ fontSize: '25px', color: '#333', }}>{text}</p>
                {/* Exibe o texto passado como prop */}
            </div>
        </Link>

    )
}

export default CustomBox;