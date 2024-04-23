import Complaint from '../../component/memberComponent/Complaint'

export default function Complaints(){
    return (
        <div>
            <div className='h-[80%] w-[80%] mt-10 ml-32'>
                <div className='text-center text-5xl'>
                    FILE YOUR COMPLAINT
                </div>
                <Complaint/>
            </div>
        </div>
    )
}