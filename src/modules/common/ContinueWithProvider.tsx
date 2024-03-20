import { Box, Typography } from "@mui/material"
import React from "react"

export function ContinueWithAuthProvider({ logo, name }: {logo?: string,name: string}) {
    return (
      <Box className='mt-10'>
          <Box className='relative'>
              {/* Continue with */}
              <Box className='absoulute inset-0 flex items-center' aria-hidden='true'>
                  <Box className='w-full border-gray-500'>{ logo }</Box>
              </Box>
              <Box className='relative -mt-2 flex justify-center text-sm font-medium leading-6'>
                <Typography className='px-2 bg-white text-gray-500'>Continue with { name }</Typography>
              </Box>
              {/* Sign in button */}
              <Box className="mt-6 grid grid-cols-1 text-white">
                  <a href="#" className="flex w-full items-center justify-center gap-3 rounded-md bg-[#020202] px-3 focus-visible:outline-offset-2 focus-visible:outline-[#020202] hover:bg-red-500">
                    <Typography className="text-sm font-semibold leading-6">{ name }</Typography>
                  </a>
              </Box>
          </Box>        
      </Box>

 

    )

  }

 

  export default ContinueWithAuthProvider