"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { type BaseError, useWriteContract } from "wagmi";
import { Address } from 'viem';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { styled } from '@mui/system';

import { abi } from "./abi";

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');

  const defaultTheme = createTheme({ palette: { mode } });

  const [funcAddrStr, setFuncAddrStr] = useState("0xc7DD5b639561b3c66633DAA3A42a640fD5cA104b");
  const [lpToken, setLpToken] = useState("");
  const [offeringToken, setOfferingToken] = useState("");
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [stakingPoolAddress, setStakingPoolAddress] = useState("");
  const [rateMultiplier, setRateMultiplier] = useState("1");

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const account = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    var unixTimestamp = Math.round(+new Date()/1000);
    setStartTimestamp(unixTimestamp.toString());
    setEndTimestamp(unixTimestamp.toString());
  }, []);

  const isValidETHAddress = (str: string) =>
    {
      // Regex to check valid
      // BITCOIN Address
      let regex = new RegExp(/^(0x)?[0-9a-fA-F]{40}$/);
    
      // if str
      // is empty return false
      if (str == null) {
          return false;
      }
    
      // Return true if the str
      // matched the ReGex
      return regex.test(str);
    }

  async function createIFO() {
    if (!isValidETHAddress(funcAddrStr)) {
      alert("Invalid Function Address");
      return;
    }

    const funcAddr = funcAddrStr as Address;
    writeContract({
      address: funcAddr,
      abi,
      functionName: "createIFO",
      args: [lpToken,
        offeringToken,
        Number(startTimestamp),
        Number(endTimestamp),
        adminAddress,
        stakingPoolAddress,
        Number(rateMultiplier)
      ]
    })
  }

  console.log("account", account);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
              <Typography variant="subtitle2">Create IFO</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <w3m-button />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_funcAddress">
                  CreateIFO Function(address)
                </FormLabel>
                <OutlinedInput
                  id="_funcAddress"
                  placeholder="CreateIFO Function(address)"
                  value={funcAddrStr}
                  onChange={(e) => {
                    const _val = e.target.value;                    
                    setFuncAddrStr(e.target.value);
                  }}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_lpToken">
                  _lpToken(address)
                </FormLabel>
                <OutlinedInput
                  id="_lpToken"
                  placeholder="_lpToken(address)"
                  value={lpToken}
                  onChange={(e) => setLpToken(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_offeringToken">
                  _offeringToken(address)
                </FormLabel>
                <OutlinedInput
                  id="_offeringToken"
                  placeholder="_offeringToken(address)"
                  value={offeringToken}
                  onChange={(e) => setOfferingToken(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_startTimestamp">
                  _startTimestamp(uint256)
                </FormLabel>
                <OutlinedInput
                  id="_startTimestamp"
                  type="number"
                  placeholder="_startTimestamp(uint256)"
                  value={startTimestamp}
                  onChange={(e) => setStartTimestamp(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_startTimestamp">
                  _endTimestamp(uint256)
                </FormLabel>
                <OutlinedInput
                  id="_endTimestamp"
                  type="number"
                  placeholder="_endTimestamp(uint256)"
                  value={endTimestamp}
                  onChange={(e) => setEndTimestamp(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_adminAddress">
                  _adminAddress(address)
                </FormLabel>
                <OutlinedInput
                  id="_adminAddress"
                  placeholder="_adminAddress(address)"
                  value={adminAddress}
                  onChange={(e) => setAdminAddress(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_stakingPoolAddress">
                  _stakingPoolAddress(address)
                </FormLabel>
                <OutlinedInput
                  id="_stakingPoolAddress"
                  placeholder="_stakingPoolAddress(address)"
                  value={stakingPoolAddress}
                  onChange={(e) => setStakingPoolAddress(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="_rateMultiplier">
                  _rateMultiplier(uint256)
                </FormLabel>
                <OutlinedInput
                  id="_rateMultiplier"
                  type="number"
                  placeholder="_rateMultiplier(uint256)"
                  value={rateMultiplier}
                  onChange={(e) => setRateMultiplier(e.target.value)}
                />
              </FormGrid>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column-reverse', sm: 'row' },
                  alignItems: 'end',
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 0 },
                  mb: '60px',
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={createIFO}
                  sx={{
                    width: { xs: '100%', sm: 'fit-content' },
                  }}
                  disabled={!account || !account.isConnected}
                >
                  Write
                </Button>
                {error && <Typography variant="subtitle2" color="text.secondary">
                  Error: {(error as BaseError).shortMessage || error.message}
                </Typography>}
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
