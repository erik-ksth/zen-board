import { bouncy } from "ldrs";

bouncy.register();

const Loader = () => {
     return (
          <div className="justify-center items-center flex-col gap-y-5">
               <l-bouncy size="45" speed="1.25" color="black"></l-bouncy>
          </div>
     );
};

export default Loader;