import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { useDropzone, DropzoneOptions, FileRejection, DropEvent } from 'react-dropzone';
import Image from "next/image";
import { Button } from "./button";

interface ImageUploaderProps {
    handleImagesSelected: (imageFiles: File[]) => void; // Alterado para receber um array de File[]
}

function ImageUploader({ handleImagesSelected }: ImageUploaderProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Alterado para armazenar os arquivos selecionados

    const handleDrop = (acceptedFiles: File[]) => {
        setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]); // Adiciona os arquivos selecionados ao estado
        handleImagesSelected(acceptedFiles); // Passa os arquivos selecionados para a função handleImagesSelected
    };

    const handleRemove = (index: number) => {
        const newFiles = [...selectedFiles]; // Cria uma cópia do array de arquivos
        newFiles.splice(index, 1); // Remove o arquivo na posição index
        setSelectedFiles(newFiles); // Atualiza o estado com a nova lista de arquivos
        handleImagesSelected(newFiles); // Passa os arquivos atualizados para a função handleImagesSelected
    };



    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        multiple: true,
    });



    return (
        <>
            <div>
                <div className="grid gap-2">
                    {/* Renderiza a primeira imagem selecionada */}
                    {selectedFiles.length > 0 ? (
                        <button onClick={() => handleRemove(0)}>
                            <Image
                                alt="Car image"
                                className="aspect-square w-full rounded-md object-cover border border-dashed"
                                height="300"
                                src={URL.createObjectURL(selectedFiles[0])}
                                width="300"
                                style={{ objectFit: 'contain' }}
                            />
                        </button>
                    ) : (
                        <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover "
                            height="300"
                            src={"/placeholder.svg"}
                            width="300"
                        />
                    )}
                    {/* Renderiza as imagens adicionais abaixo da primeira */}
                    <div className="grid grid-cols-3 gap-2">
                        {selectedFiles.length > 1 &&
                            selectedFiles.slice(1).map((file, index) => (
                                <div key={index} onClick={() => handleRemove(index + 1)}>
                                    <Image
                                        alt="Car image"
                                        className="aspect-square w-full rounded-md object-cover border border-dashed"
                                        height="84"
                                        src={URL.createObjectURL(file)}
                                        width="84"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            ))}

                        {/* Renderiza os botões de upload e as imagens de espaço reservado */}
                        <div  {...getRootProps()} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed pointer">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <input {...getInputProps()} />
                            <span className="sr-only">Upload</span>
                        </div>

                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImageUploader;
