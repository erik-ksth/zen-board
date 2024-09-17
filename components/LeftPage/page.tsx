import Input from './LeftPageComponents/Input';
import Date from './LeftPageComponents/TodayDate';

export default function LeftPage() {
     return (
          <div className="w-full h-full p-6 bg-gradient-to-l from-zinc-200 from-0% via-white via-20% to-white rounded-l-lg">
               <div className='text-end'>
                    <Date />
               </div>
               <h1 className='text-center uppercase text-2xl font-extrabold underline mt-2'>To-Do Tasks</h1>
               <Input />
          </div>
     )
}