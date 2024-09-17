import React, { useEffect, useState } from 'react';
import { IconPencilMinus } from '@tabler/icons-react';

type Task = {
     id: number;
     startTime: string;
     endTime: string;
     task: string;
};

export default function Schedule() {
     const [schedule, setSchedule] = useState<Task[]>([]);
     const [editTaskId, setEditTaskId] = useState<number | null>(null);
     const [editedTask, setEditedTask] = useState<{ startTime: string; endTime: string; task: string }>({
          startTime: '',
          endTime: '',
          task: '',
     });
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          const storedSchedule = JSON.parse(localStorage.getItem('schedule') || '[]');

          if (storedSchedule) {

               const sortedSchedule = storedSchedule.sort((a: Task, b: Task) => {
                    const [aHour, aMinute] = a.startTime.split(":").map(Number);
                    const [bHour, bMinute] = b.startTime.split(":").map(Number);
                    return aHour !== bHour ? aHour - bHour : aMinute - bMinute;
               });
               setSchedule(sortedSchedule);
          }
     }, []);

     const formatTime = (time: string) => {
          if (!time) return '';
          const [hour, minute] = time.split(":");
          const hourInt = parseInt(hour);
          const period = hourInt >= 12 ? "PM" : "AM";
          const hour12 = hourInt % 12 || 12;
          return `${hour12}:${minute} ${period}`;
     };

     const clearSchedule = () => {
          localStorage.removeItem('schedule');
          setSchedule([]);
          window.location.reload();
     };

     const handleEditClick = (taskId: number) => {
          const taskToEdit = schedule.find(task => task.id === taskId);
          if (taskToEdit) {
               setEditTaskId(taskId);
               setEditedTask({
                    startTime: taskToEdit.startTime,
                    endTime: taskToEdit.endTime,
                    task: taskToEdit.task,
               });
               setError(null);  // Clear any previous errors
          }
     };

     const handleSaveClick = (taskId: number) => {
          if (!isValidTime(editedTask.startTime, editedTask.endTime)) {
               setError('End time must be later than start time.');
               return;
          }

          const updatedSchedule = schedule.map(task =>
               task.id === taskId ? { ...task, ...editedTask } : task
          );
          setSchedule(updatedSchedule);
          localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
          setEditTaskId(null);
          window.location.reload();
     };

     const isValidTime = (startTime: string, endTime: string) => {
          const start = new Date(`1970-01-01T${startTime}:00`);
          const end = new Date(`1970-01-01T${endTime}:00`);
          return end > start;
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
          setEditedTask(prev => ({
               ...prev,
               [field]: e.target.value,
          }));
          setError(null);  // Clear the error message when input changes
     };

     return (
          <div className='relative w-full h-full text-center'>
               <button className="absolute top-0 right-0 text-sm text-zinc-500" onClick={clearSchedule}>
                    Clear Schedule
               </button>

               <h1 className='font-bold text-xl'>Here is a productive schedule for you!</h1>

               {/* Schedule Box */}
               <div className='flex flex-col gap-y-4 w-full h-[95%] pt-10 overflow-y-scroll hide-scrollbar'>
                    {schedule.length === 0 ? (
                         <p>No schedule found. Please create one!</p>
                    ) : (
                         schedule.map((task) => (
                              <div key={task.id} className='flex flex-col justify-center items-center w-full p-5 bg-zinc-100 rounded-lg'>
                                   {editTaskId === task.id ? (
                                        <div className='flex flex-col justify-start w-full items-start gap-y-2'>
                                             <input
                                                  type="time"
                                                  value={editedTask.startTime}
                                                  onChange={(e) => handleInputChange(e, 'startTime')}
                                                  className="text-md border border-gray-300 rounded-lg px-2 py-1"
                                                  placeholder="Start Time (HH:mm)"
                                             />
                                             <input
                                                  type="time"
                                                  value={editedTask.endTime}
                                                  onChange={(e) => handleInputChange(e, 'endTime')}
                                                  className="text-md border border-gray-300 rounded-lg px-2 py-1"
                                                  placeholder="End Time (HH:mm)"
                                             />
                                             <input
                                                  type="text"
                                                  value={editedTask.task}
                                                  onChange={(e) => handleInputChange(e, 'task')}
                                                  className="text-xl font-normal border border-gray-300 rounded-lg px-2 py-1"
                                                  placeholder="Task Name"
                                             />
                                             {error && <p className="text-red-500 text-sm">{error}</p>}
                                             <div className='flex gap-x-5'>
                                                  <button
                                                       onClick={() => handleSaveClick(task.id)}
                                                       className="mt-2 px-4 py-2 w-24 bg-black text-white rounded-lg"
                                                  >
                                                       Save
                                                  </button>
                                                  <button
                                                       onClick={() => setEditTaskId(null)}
                                                       className="mt-2 px-4 py-2 w-24 text-black border border-black rounded-lg"
                                                  >Cancel</button>
                                             </div>
                                        </div>
                                   ) : (
                                        <div className='flex justify-between items-end w-full'>
                                             <div className='flex flex-col justify-start w-full items-start gap-y-2'>
                                                  <p className='text-md'>{formatTime(task.startTime)} - {formatTime(task.endTime)}</p>
                                                  <p className='text-xl font-normal'>{task.task}</p>
                                             </div>

                                             <button
                                                  onClick={() => handleEditClick(task.id)}
                                                  className="text-zinc-500"
                                             >
                                                  <IconPencilMinus />
                                             </button>
                                        </div>
                                   )}
                              </div>
                         ))
                    )}
               </div>
          </div>
     );
}