import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  InputBase,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@mui/material/styles';
import { Chat, type ChatGroup } from '../types';
import ChatData from '../components/chatData';
import ChatModal from '../components/chatModal';
import Head from 'next/head';
import theme from '../theme';
import { getAllChatGroups, setAllChatGroups } from '~/utils/chatGroupUtils';
import YoutubeLinkDialog from '~/components/YoutubeLinkDialog';

// TODO: Add a loading skeleton for chats
// TODO: Scrollbars are not that good looking
export default function Home() {
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState<boolean>(false);

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
      <YoutubeLinkDialog
        open={youtubeDialogOpen}
        onCancel={() => {
          setYoutubeDialogOpen(false);
        }}
        onSubmit={(url: string) => {
          // get info and add to chat groups

          setChatGroups((prevChatGroups) => {
            const selectedChatGroup = {
              chatGroupId: String(prevChatGroups.length + 1),
              title: url,
            } as ChatGroup;

            handleSelectChat(
              selectedChatGroup.chatGroupId,
              selectedChatGroup.title,
            );

            return [...prevChatGroups, selectedChatGroup] as ChatGroup[];
          });

          setYoutubeDialogOpen(false);
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
                  <ChatModal chatGroupId={selected} title={selectedTitle} />
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
