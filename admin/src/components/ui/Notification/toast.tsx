import { TypeAttributes } from '../@types/common';
import toast from '../toast';
import Notification from './Notification';

export const popNotification = ( 
    title: string, 
    message: string,  
    type: TypeAttributes.Status, 
    duration = 5000 
): void => {
    toast.push(
        <Notification title={title} type={type} duration={duration}>
            {message}
        </Notification>,
        {
            placement: 'top-center',
        }
    );
}