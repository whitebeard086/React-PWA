import { useEffect } from 'react' 
import { Button, Tooltip, Upload } from '@/components/ui'
import useCompressFile from '@/utils/hooks/useCompressFile'
import { RiImageEditFill } from 'react-icons/ri'
import { useUpdateCategory } from '../../utils/hooks'

type Props = {
    slug: string
}

const UploadIcon = ({ slug }: Props) => {
    const { mutate: changeIcon, isError, isSuccess, isLoading } = useUpdateCategory()
    const { compressFile, compressedFile, resetCompressedFile } = useCompressFile()
    console.log(compressedFile);

    const onFileUpload = (files: File[]) => {
        if(files.length > 0) {
            compressFile(files[0])
        }
    }

    const onChangeIcon = () => {
        changeIcon({ slug, icon: compressedFile })
    }

    useEffect(() => {
        if (compressedFile !== null) {
            onChangeIcon()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compressedFile])

    useEffect(() => {
        if (isError || isSuccess) {
            resetCompressedFile()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess])

    return (
        <Upload
            className='absolute bottom-0 -right-2'
            accept='image/*'
            showList={false}
            uploadLimit={1}
            onChange={onFileUpload}
        >
            <Tooltip title='Change Icon'>
                <Button
                    size='xs'
                    shape='circle'
                    variant='twoTone'
                    icon={<RiImageEditFill className='text-s' />}
                    loading={isLoading}
                >
                    
                </Button>
            </Tooltip>
        </Upload>
    )
}
export default UploadIcon