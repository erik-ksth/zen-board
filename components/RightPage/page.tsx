"use client";

import { useEffect, useState } from "react";
// import Loader from "../Loader";
import runScheduler from "@/app/api/generate-schedule";
import Schedule from "./RightPageComponents/Schedule";

export default function RightPage() {

     const [loading, setLoading] = useState(false);
     const [noTasks, setNoTasks] = useState<boolean>(false);
     const [noSchedule, setNoSchedule] = useState<boolean>(true);

     useEffect(() => {
          const response = localStorage.getItem('schedule');
          if (response) {
               setNoSchedule(false);
          }
     }, []);

     const parseScheduleString = (scheduleString: string) => {
          const parsedSchedule = scheduleString.split("%").filter(Boolean).map((entry, index) => {
               const [time, task] = entry.split("$");
               const [startTime, endTime] = time.split("-");
               return {
                    id: index + 1,
                    startTime,
                    endTime,
                    task
               };
          });

          return parsedSchedule.slice(0, -1);
     };

     const handleGetStarted = async () => {
          const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

          if (storedTasks?.length === 0) {
               setNoTasks(true);
               setLoading(false);
          } else {
               console.log('Tasks:', storedTasks);
               setNoTasks(false);
               setLoading(true);

               try {
                    const result = await runScheduler(storedTasks);
                    console.log("Raw result: ", result);

                    const schedule = parseScheduleString(result);
                    console.log("Parsed Schedule:", schedule);

                    localStorage.setItem("schedule", JSON.stringify(schedule));

                    setNoSchedule(false);
               } catch (error) {
                    console.error("Error creating schedule:", error);
               } finally {
                    setLoading(false);
               }
          }
     };

     return (
          <div className="w-full h-full p-6 bg-white rounded-r-lg">
               Hello
               {noSchedule ? (
                    <div className="w-full h-full">
                         {
                              loading ? (
                                   <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                                        {/* <Loader /> */}
                                        <h1>Tailoring your Timeline...</h1>
                                   </div>
                              ) : (
                                   <div className="relative w-full h-[55%] p-6 text-center flex flex-col justify-end items-center bg-white rounded-r-lg">
                                        <h1 className="uppercase font-extrabold text-5xl">Zen Board</h1>
                                        <p className="mt-2 text-2xl">Streamline Your Day With <b>AI</b></p>
                                        <p className="mt-20">Ready to be productive?</p>
                                        <button
                                             className="mt-5 px-7 py-2 bg-zinc-200 hover:bg-zinc-600 hover:text-white border border-black rounded-md"
                                             onClick={handleGetStarted}
                                        >
                                             Get Started
                                        </button>
                                        {noTasks && <p className="absolute bottom-[-20px] text-red-400">Please add a task!</p>}
                                   </div>
                              )
                         }
                    </div>
               ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                         <Schedule />
                    </div>
               )
               }
          </div>
     )
}