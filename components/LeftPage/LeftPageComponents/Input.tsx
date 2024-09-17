"use client";

import { useEffect, useRef, useState } from "react";
import { IconEraser } from '@tabler/icons-react';

export default function Input() {

     const [tasks, setTasks] = useState<string[]>(() => {
          if (typeof window !== 'undefined') {
               const savedTasks = localStorage.getItem('tasks');
               return savedTasks ? JSON.parse(savedTasks) : [];
          }
          return [];
     });
     const tasksRefs = useRef<HTMLInputElement[]>([]);

     useEffect(() => {
          localStorage.setItem('tasks', JSON.stringify(tasks));
     }, [tasks]);

     const addTask = () => {
          const newTasks = [...tasks, ""];
          setTasks(newTasks);
          setTimeout(() => {
               tasksRefs.current[newTasks.length - 1]?.focus();
          }, 0);
     };

     const updateTask = (index: number, value: string) => {
          const newTasks = [...tasks];
          newTasks[index] = value;
          setTasks(newTasks);
     };

     const removeTask = (index: number) => {
          const newTasks = tasks.filter((_, i) => i !== index);
          setTasks(newTasks);
     }

     const handleTaskBlur = (index: number) => {
          if (!tasks[index]) {
               removeTask(index);
          }
     }

     const handleTaskBoxClick = (e: React.MouseEvent<HTMLInputElement>) => {
          const target = e.target as HTMLElement;
          if (target.tagName !== 'INPUT' && target.tagName !== 'BUTTON') {
               addTask();
          }
     }

     const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
          if (e.key === 'Enter' && tasks[index]) {
               addTask();
          } else if (e.key === 'Backspace' && !tasks[index]) {
               removeTask(index);
          }
     }

     const handleClearAll = () => {
          return () => {
               setTasks([]);
          }
     }

     return (
          <div className="w-full h-[85%] my-5 px-2 cursor-pointer" onClick={handleTaskBoxClick}>
               <div className="h-full overflow-y-scroll hide-scrollbar">
                    {tasks.length > 0 ? (
                         tasks.map((task, index) => (
                              <li className="flex w-full my-5 border-b border-zinc-400" key={index}>
                                   <button
                                        className="mr-2 text-xs"
                                        onClick={(e) => {
                                             e.stopPropagation(); // Stop event propagation
                                             removeTask(index);
                                        }}
                                   >
                                        <IconEraser stroke={1.5} />
                                   </button>
                                   <input
                                        className="w-full bg-transparent text-xl outline-none ml-3"
                                        value={task}
                                        onChange={(e) => updateTask(index, e.target.value)}
                                        onBlur={() => handleTaskBlur(index)}
                                        onKeyDown={(e) => handleTaskKeyDown(e, index)}
                                        ref={(el) => {
                                             if (el) {
                                                  tasksRefs.current[index] = el;
                                             }
                                        }}
                                   />
                              </li>
                         ))
                    ) : (
                         <p className="h-full flex justify-center items-center text-lg text-center text-zinc-500">
                              No tasks yet. Click to add a task!
                         </p>
                    )}
               </div>
               <button
                    className="w-full text-end text-lg mt-5 text-zinc-500"
                    onClick={handleClearAll()}
               >Clear All</button>
          </div>
     )
}