import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import etheriumLogo from '../assets/etheriumLogo.svg';
import shareIcon from '../assets/shareIcon.svg';
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';

import MarketABI from '../utils/Marketabi.json';

import CreateNFT from '../components/CreateNFT';
import Editprofile from '../components/Editprofile';



import {NFT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS} from '../config.js'

const Profile = ({ acc }) => {
  // const MARKET_CONTRACT_ADDRESS = '0xF03614BF7FeC9f77aa0CF4F85D344Ce8A80524cD';
  const [username, setUsername] = useState();
  const [isShown, setIsShown] = useState(false);
  const [photoFile, setPhotoFile] = useState();
  const [photoFileName, setPhotoFileName] = useState();
  const [profileBanner, setProfileBanner] = useState();
  const [profilePic, setProfilePic] = useState();

  const [artistInfo, setArtistInfo] = useState([]);

  const [openCreateNFT, setOpenCreateNFT] = useState(false);
  const [open, setOpen] = useState(false);

  const [marketContract, setMarketContract] = useState();

  var account = acc.slice(0,6)+'. . . . . .'+acc.slice(-5);

  const navigate = useNavigate();

  const onChangePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
    setPhotoFileName(e.target.files[0].name);
  };

  const onSubmitPhoto = async (e) => {
    const file = photoFile;
    const name = photoFileName;
  };

 

  const getArtist = async () => {
    let _artistInfo = await marketContract.getArtistInfo(acc);
    // tx = await transaction.wait();
    setArtistInfo(_artistInfo);
    console.log('Artist', _artistInfo);
  };

  useEffect(() => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const marketPlaceContract = new ethers.Contract(
          MARKET_CONTRACT_ADDRESS,
          MarketABI.abi,
          signer
        );
        setMarketContract(marketPlaceContract);
      }
    } catch (err) {
      console.log('In error: ' + err);
    }
  }, []);

  useEffect(() => {
    if (acc && marketContract) {
      getArtist();
    }
  }, [acc, marketContract]);

  const defaultImage =
  'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';

  return (
    <div className='grid bg-[#0a111a] pt-2'>
      <div className='grid mx-12 h-80'>
        <img
          className=' rounded-lg bg-white w-full h-80 object-cover place-self-center'
          src={require('../assets/fallbackBanner.jpg')}
          alt='profileBanner'
        />

        

        <img
          className='rounded-[50%] bg-white w-32 h-32 object-cover place-self-center -mt-16'
          src={artistInfo.artistImageURI?artistInfo.artistImageURI.replace(".infura", ""):defaultImage}
          alt='profilePic'
        />

        <button
          onClick={() => setIsShown(true)}
          className='hidden justify-self-end w-28 -mt-28 mr-2 bg-[#3f313110] text-black text-xs h-10 rounded-lg border-2 border-black'
        >
          Edit
        </button>
        {isShown && (
          <div className='flex flex-col bg-gray-400 w-1/2 h-80 absolute justify-center items-center self-center justify-self-center'>
            <img className='w-2/3 h-40' src={profileBanner} alt='' />
            <input
              className='text-black  bg-white'
              type='file'
              accept='image/*'
              multiple={false}
              id='profileBanner'
              onChange={onChangePhoto}
            />
            <button
              onClick={() => {
                onSubmitPhoto();
              }}
              class='bg-[#8164a4] hover:bg-[#7138bb] text-white font-bold py-2 px-4 rounded-full'
            >
              Update Banner
            </button>
            <button
              onClick={() => {
                setIsShown(false);
              }}
              class='bg-[#8164a4] hover:bg-[#7138bb] text-white font-bold py-2 px-4 rounded-full'
            >
              Close
            </button>
          </div>
        )}
        <h1 className='text-xl place-self-center text-white mt-2'>
          {artistInfo.artistName}
        </h1>
      </div>
      <div className='flex gap-1.5 rounded-lg text-xs bg-otherGray w-36 h-7 mt-28 text-lightGray place-self-center'>
        <img className='ml-1' src={etheriumLogo} />
        <p className='mt-1.5 truncate text-white'>{account}</p>
      </div>
      <div className='flex gap-4 place-self-center mt-6'>
        <button
          onClick={() => setOpen(true)}
          className='w-32 h-10 border-solid border-2 border-otherGray text-xs text-white rounded-lg'
        >
          Edit Profile
        </button>
        
      <Editprofile open={open} setOpen={setOpen} acc={acc} />
        <button className='w-11 h-10 border-solid border-2 text-otherGray rounded-lg'>
          <img className='ml-2.5' src={shareIcon} />
        </button>
      </div>
      <div className='border-solid border mt-8 mx-12 border-otherGray'></div>
      <div>
        <button
          className='w-32 h-10 border-solid border-2 bg-black border-black bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext text-xs text-white float-right rounded-lg mr-28 mt-8'
          onClick={() => setOpenCreateNFT(true)}
        >
          Create NFT
        </button>
      </div>
      <Cards acc={acc} />
      <CreateNFT openCreateNFT={openCreateNFT} setOpenCreateNFT={setOpenCreateNFT} acc={acc} />
    </div>
  );
};
export default Profile;




