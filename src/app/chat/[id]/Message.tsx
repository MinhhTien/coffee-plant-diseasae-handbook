import { DocumentData } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '~/utils/firebase/auth'
import { Box, Typography, Tooltip } from '@mui/material'

interface MessageProps {
  message: DocumentData
  position: 'single' | 'first' | 'middle' | 'last' | 'after-header-first' | 'after-header-single'
}

const Message = ({ message, position }: MessageProps) => {
  const [user] = useAuthState(auth)

  // Date formatting function with additional check for today's date
  const formatDateForTooltip = (date: Date) => {
    const today = new Date()
    const isToday =
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()

    const timeDifference = today.getTime() - date.getTime()
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

    if (isToday) {
      // Show only time for today's messages
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (daysDifference <= 7) {
      // Show short format with weekday for recent messages within the last 7 days
      return date
        .toLocaleString('vi-VN', {
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
        .replace('Th ', 'T')
    } else {
      // Show full format for messages older than 7 days
      return `${date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })} ${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`
    }
  }

  const messageDate = message.createdAt ? new Date(message.createdAt.toDate()) : null

  const borderRadiusRight = {
    single: '18px',
    first: '18px 18px 4px 18px',
    middle: '18px 4px 4px 18px',
    last: '18px 4px 18px 18px',
    'after-header-first': '18px 18px 4px 18px',
    'after-header-single': '18px 18px 18px 18px'
  }[position]

  const borderRadiusLeft = {
    single: '18px',
    first: '18px 18px 18px 4px',
    middle: '4px 18px 18px 4px',
    last: '4px 18px 18px 18px',
    'after-header-first': '18px 18px 18px 4px',
    'after-header-single': '18px 18px 18px 18px'
  }[position]

  const marginTop = {
    first: '8px',
    'after-header-first': '0px',
    'after-header-single': '0px',
    middle: '2px',
    last: '2px',
    single: '0'
  }[position]

  return (
    <Tooltip
      title={messageDate ? formatDateForTooltip(messageDate) : ''}
      placement={user?.uid === message.senderId ? 'left' : 'right'}
      enterDelay={300}
      enterNextDelay={300}
    >
      <Box
        sx={{
          maxWidth: '500px',
          width: 'fit-content',
          borderRadius: user?.uid === message.senderId ? borderRadiusRight : borderRadiusLeft,
          padding: '8px 16px',
          backgroundColor: user?.uid === message.senderId ? '#2EC4B6' : '#00000033',
          marginLeft: user?.uid === message.senderId ? 'auto' : '0',
          marginTop
        }}
      >
        <Box display='flex' flexDirection='column' gap={0.5}>
          <Typography variant='body1' sx={{ color: user?.uid === message.senderId ? 'white' : 'black' }}>
            {message.message}
          </Typography>
          {/* {(position === 'last' || position === 'single') && (
            <Typography
              variant='caption'
              sx={{
                color: user?.uid === message.senderId ? 'white' : 'black',
                textAlign: user?.uid === message.senderId ? 'right' : 'left'
              }}
            >
              {messageDate?.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
          )} */}
        </Box>
      </Box>
    </Tooltip>
  )
}

export default Message
