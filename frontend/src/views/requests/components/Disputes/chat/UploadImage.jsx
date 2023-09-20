/* eslint-disable react/prop-types */
import { Button, Dialog, Upload } from '@/components/ui';
import {
    resetFiles,
    sendMessage,
    setFiles,
    toggleUploadImageDialog,
} from '@/views/requests/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FcImageFile } from 'react-icons/fc';
import useCompressFile from '@/utils/hooks/useCompressFile';
import TextareaAutosize from 'react-textarea-autosize';

const UploadImage = () => {
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const { compressFile, compressedFile, resetCompressedFile } =
        useCompressFile();

    const { uploadImageDialog, files } = useSelector(
        (state) => state.requests.state
    );
    const { dispute, messageStatus, sendingMessage } = useSelector(
        (state) => state.requests.data
    );
    const { profile } = useSelector((state) => state.auth.user);

    const onFileUpload = (files) => {
        for (const file of files) {
            compressFile(file, 0.15);
        }
    };

    const handleChange = (e) => {
        setCaption(e.target?.value);
    };

    const onDialogClose = () => {
        setCaption('');
        dispatch(resetFiles());
        dispatch(toggleUploadImageDialog(false));
    };

    const onReset = () => {
        setCaption('');
        dispatch(resetFiles());
    };

    const onSend = () => {
        dispatch(
            sendMessage({
                dispute_id: dispute?.id,
                sender_id: profile?.id,
                media: files,
                message: caption,
            })
        );
    };

    useEffect(() => {
        if (compressedFile !== null) {
            dispatch(setFiles(compressedFile));
        }

        resetCompressedFile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compressedFile]);

    useEffect(() => {
        if (messageStatus === 'success') {
            onDialogClose();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageStatus]);

    return (
        <Dialog
            isOpen={uploadImageDialog || false}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            scrollable
            // contentClassName="mt-[30vh]"
            title='Attach Image(s)'
        >
            <div className='mt-8'>
                {files?.length < 1 && (
                    <Upload
                        multiple
                        draggable
                        accept='image/*'
                        // uploadLimit={6}
                        showList={false}
                        onChange={onFileUpload}
                    >
                        <div className='my-6 text-center'>
                            <div className='text-6xl mb-4 flex justify-center'>
                                <FcImageFile />
                            </div>
                            <p className='font-semibold'>
                                <span className='text-blue-500'>
                                    Attach Image(s)
                                </span>
                            </p>
                        </div>
                    </Upload>
                )}
            </div>
            {files?.length > 0 && (
                <div className='flex flex-col gap-4'>
                    {files.map((file, index) => {
                        const url = URL?.createObjectURL(file);
                        return (
                            <div key={index}>
                                <img src={url} alt='' />
                                <p className='text-xs font-semibold mb-2 text-primary-500'>
                                    {file.name}
                                </p>
                            </div>
                        );
                    })}

                    <TextareaAutosize
                        className='w-full block text-sm outline-none p-3 bg-gray-200 overflow-auto resize-none rounded-md border-0 active:border-0'
                        onChange={handleChange}
                        value={caption}
                        placeholder='Add caption...'
                        maxRows={6}
                        minRows={3}
                    />
                </div>
            )}
            {files?.length > 0 && (
                <div className='mt-8 flex items-center gap-4'>
                    <Button
                        block
                        variant='solid'
                        color='gray-900'
                        size='sm'
                        loading={sendingMessage}
                        onClick={onSend}
                    >
                        Send
                    </Button>
                    <Button
                        block
                        variant='solid'
                        color='red-500'
                        size='sm'
                        disabled={sendingMessage}
                        onClick={onReset}
                    >
                        Clear
                    </Button>
                </div>
            )}
        </Dialog>
    );
};
export default UploadImage;
