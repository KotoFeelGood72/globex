'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
} from '@nextui-org/react';
import { Invoice } from '@/types/deal';

interface InvoiceUploadProps {
  currentInvoice?: Invoice;
  onUpload: (file: File) => void;
  onRemove?: () => void;
}

export function InvoiceUpload({ currentInvoice, onUpload, onRemove }: InvoiceUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardBody>
        {currentInvoice ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{currentInvoice.filename}</p>
                <p className="text-small text-default-500">
                  {formatFileSize(currentInvoice.size)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={currentInvoice.url} target="_blank">
                  <Button size="sm" color="primary">
                    Просмотр
                  </Button>
                </Link>
                {onRemove && (
                  <Button 
                    size="sm" 
                    color="danger"
                    variant="flat"
                    onPress={onRemove}
                  >
                    Удалить
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center ${
              isDragging ? 'border-primary bg-primary/10' : 'border-default-200'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-2">
              <p>Перетащите файл сюда или</p>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
                className="max-w-xs mx-auto"
              />
              <p className="text-small text-default-500">
                Поддерживаемые форматы: PDF, DOC, DOCX, XLS, XLSX
              </p>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
