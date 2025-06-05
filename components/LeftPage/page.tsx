import Input from './LeftPageComponents/Input';
import Date from './LeftPageComponents/TodayDate';

export default function LeftPage() {
     return (
          <div className="w-full h-full p-6 bg-gradient-to-l from-zinc-200 from-0% via-white via-20% to-white rounded-l-lg">
               <div className='flex flex-row justify-between w-full items-center'>
                    <h1 className='text-center uppercase text-2xl font-extrabold'>To-Do Tasks</h1>
                    <Date />
               </div>
               <Input />
          </div>
     )
}