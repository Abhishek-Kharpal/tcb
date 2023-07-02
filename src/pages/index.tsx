import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  InputBase,
  IconButton,
  LinearProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@mui/material/styles';
import { type ChatGroup } from '../types';
import ChatData from '../components/chatData';
import ChatModal from '../components/chatModal';
import Head from 'next/head';
import theme from '../theme';
import { getAllChatGroups, setAllChatGroups } from '~/utils/chatGroupUtils';
import YoutubeLinkDialog from '~/components/YoutubeLinkDialog';
import { getVideoInfo } from '~/utils/youtubeUtils';
import { ErrorContext } from '~/contexts/errorContext';

// TODO: Add a loading skeleton for chats
// TODO: Scrollbars are not that good looking
export default function Home() {
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState<boolean>(false);
  const [loadTranscript, setLoadTranscript] = useState<boolean>(false);

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const chatGroups = getAllChatGroups();
    setChatGroups(chatGroups);
  }, []);

  const handleSelectChat = (chatGroupId: string, title: string) => {
    setSelected(chatGroupId);
    setSelectedTitle(title);
  };

  return (
    <>
      {loadTranscript && (
        <LinearProgress
          sx={{
            bgcolor: '#20232b',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#b785f5',
            },
          }}
        />
      )}

      <YoutubeLinkDialog
        open={youtubeDialogOpen}
        onCancel={() => {
          setYoutubeDialogOpen(false);
        }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={async (url: string) => {
          setLoadTranscript(true);
          const videoInfo = await getVideoInfo(url, setError);

          if (!videoInfo) {
            setLoadTranscript(false);
            return;
          }

          setChatGroups((prevChatGroups) => {
            const newChatGroup = {
              chatGroupId: String(prevChatGroups.length + 1),
              youtubeVideoUrl: url,
              title: videoInfo.title,
            } as ChatGroup;

            handleSelectChat(newChatGroup.chatGroupId, newChatGroup.title);

            setAllChatGroups([...prevChatGroups, newChatGroup]);

            return [...prevChatGroups, newChatGroup];
          });

          setYoutubeDialogOpen(false);
          setLoadTranscript(false);
        }}
      />
      <Head>
        <title>Convert Tutorials to Blog</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Space for header */}
            <Box
              sx={{
                height: '72px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              className="basic-padding"
            >
              {/* TODO: Change LOGO */}
              <Typography variant="h4" textTransform="none">
                Logo
              </Typography>

              <Avatar
                sx={{
                  bgcolor: 'secondary.light',
                  color: 'primary.contrastText',
                  cursor: 'pointer',
                }}
              />
            </Box>
            <Divider
              sx={{
                bgcolor: 'primary.contrastText',
              }}
            />
            {/* Space for content */}
            <Box
              sx={{
                height: 'calc(100vh - 72px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              className="basic-padding"
            >
              {/* SidePanel */}
              <Box
                sx={{
                  width: '300px',
                  height: '100%',
                }}
              >
                {/* SearchBar */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'secondary.main',
                    borderRadius: '8px',
                    padding: '0 8px',
                  }}
                >
                  <SearchIcon />
                  <InputBase
                    sx={{
                      color: 'primary.contrastText',
                      marginLeft: '8px',
                      height: '36px',
                    }}
                    placeholder="Search"
                  />
                </Box>

                {/* New Chat */}

                <Box
                  sx={{
                    height: '72px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  className="basic-padding"
                >
                  <Typography
                    sx={{
                      color: 'primary.contrastText',
                      fontWeight: 'bold',
                    }}
                  >
                    Chat
                  </Typography>
                  <IconButton
                    sx={{
                      color: 'primary.contrastText',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: '0px',
                    }}
                    onClick={() => {
                      setYoutubeDialogOpen(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Chat Group History */}

                <Box
                  sx={{
                    height: 'calc(100% - 144px)',
                    overflow: 'auto',
                  }}
                >
                  {chatGroups.map((chat: ChatGroup) => (
                    <ChatData
                      key={chat.chatGroupId}
                      chat={chat}
                      selected={selected === chat.chatGroupId}
                      onClick={() =>
                        handleSelectChat(chat.chatGroupId, chat.title)
                      }
                    />
                  ))}
                </Box>
              </Box>
              {/* ChatPanel */}
              {selected && selectedTitle ? (
                <Box
                  sx={{
                    width: 'calc(100% - 300px)',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8px',
                    ml: '32px',
                    bgcolor: '#1d1e24',
                    // TODO: Add this color to theme
                  }}
                >
                  <ChatModal
                    chatGroupId={selected}
                    title={selectedTitle}
                    youtubeVideoUrl={
                      chatGroups[Number(selected) - 1]
                        ?.youtubeVideoUrl as string
                    }
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: 'calc(100% - 300px)',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8px',
                  }}
                  className="basic-padding basic-margin"
                >
                  {/* TODO: Make it responsive */}
                  <Typography variant="h5" textTransform="none">
                    Select a chat to start
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </ThemeProvider>
      </main>
    </>
  );
}
