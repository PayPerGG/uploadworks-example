"use client"

import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useUploadWorks} from "uploadworks/client";

export default function Index() {
    
    const [file,setFile] = useState<File|undefined>(undefined)
    const [error,setError] = useState<string|undefined>(undefined)
    
    const {startUpload, uploading} = useUploadWorks("/api/uploadworks","wallpaper",
        {
            onClientUploadComplete: (slug, key, uploaded_at) => {
                alert("Success!");
            },
            onUploadError: (e) => {
                alert(e.message);
            },
            onUploadBegin: () => {},
        }
    )
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file.size > 10000000) { // 10mb
            setError("You can only upload files under 10MB.")
            return
        }
        setError(undefined)
        setFile(acceptedFiles[0]);
    }, []);
    
    const { getRootProps, getInputProps } = useDropzone({onDrop});
    
    async function upload() {
        if (!file) return;
        
        setError(undefined);
        
        try {
            await startUpload(file!)
            setTimeout(() => {
                setFile(undefined);
            }, 2000);
        } catch (e) {
            setError((e as Error).message);
        }
    }
    
    
    
    return (
        <div className="max-w-md">
            { !file &&
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="mt-4 mx-auto p-6 rounded-lg cursor-pointer" >
                        <div className="border-dashed border-2 border-gray-300 rounded-xl p-6 text-center mb-4">
                            <p>Drag & drop or click to choose an image</p>
                            <p className="text-sm text-gray-500 mt-2">Max file size: 10MB</p>
                        </div>
                    </div>                
                </div>                
            }
            { file &&
                <div className="bg-background p-4 rounded mb-4 flex justify-between items-center">
                    <div className="flex items-center">
                       <div>
                         <p className="font-medium truncate max-w-xs">{file.name}</p>
                         <p className="text-sm text-gray-500">{file.type}</p>
                       </div>
                    </div>
                    <div className="flex space-x-8">
                      <button className="p-2 disabled:cursor-not-allowed">
                        <p className="w-5 h-5 text-red-400"  onClick={()=>setFile(undefined)}>REMOVE</p>
                      </button>
                      <button  className="p-2 disabled:cursor-not-allowed">
                        <p className="w-5 h-5 text-red-400"  onClick={()=>upload()}>UPLOAD</p>
                      </button>
                      
                    </div>
                    
                </div>
            }
            {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
    )
}