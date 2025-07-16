import React from 'react';

export const LumaSpin = () => {
    return (
        <div className="relative w-[65px] aspect-square">
            <span className="absolute rounded-[50px] animate-loaderAnim shadow-[inset_0_0_0_3px] shadow-indigo-400" />
            <span className="absolute rounded-[50px] animate-loaderAnim animation-delay-1250 shadow-[inset_0_0_0_3px] shadow-rose-400" />

            <style jsx>{`
        @keyframes loaderAnim {
          0% {
            inset: 0 35px 35px 0;
          }
          12.5% {
            inset: 0 35px 0 0;
          }
          25% {
            inset: 35px 35px 0 0;
          }
          37.5% {
            inset: 35px 0 0 0;
          }
          50% {
            inset: 35px 0 0 35px;
          }
          62.5% {
            inset: 0 0 0 35px;
          }
          75% {
            inset: 0 0 35px 35px;
          }
          87.5% {
            inset: 0 0 35px 0;
          }
          100% {
            inset: 0 35px 35px 0;
          }
        }
        .animate-loaderAnim {
          animation: loaderAnim 2.5s infinite;
        }
        .animation-delay-1250 {
          animation-delay: -1.25s;
        }
      `}</style>
        </div>
    );
};