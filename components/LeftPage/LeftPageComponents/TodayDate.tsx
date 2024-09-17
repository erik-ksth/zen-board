export default function TodayDate() {

     const today = new Date();
     const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
     };

     const date = today.toLocaleDateString('en-US', options).toUpperCase();

     return (
          <>
               <p className="font-bold text-xl">{date}</p>
          </>
     )
}