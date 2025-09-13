import React from "react";
import styled from "styled-components";

// Utility function to format date
const formatDate = (isoString) => {
  if(!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date)) return "Invalid Date";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const formatTime = (isoString) => {
  if(!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date)) return "";
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};


export default function Messages({ messages = [] }) {
  if (messages.length === 0) {
    return <Empty>No messages yet. Start the conversation!</Empty>;
  }

  let lastDate = null;

  return (
    <Container>
      {messages.map(({ id, fromSelf, message, time }, idx) => {
        // If your "time" is missing, use Date.now()
        const dateToCheck = time ? new Date(time) : new Date();
        const dateString = formatDate(dateToCheck);

        const showDate =
          !lastDate || dateString !== lastDate ? (
            (lastDate = dateString), (
              <DateSeparator key={`date-${dateString}-${id}`}>
                {dateString}
              </DateSeparator>
            )
          ) : null;

        return (
          <React.Fragment key={id}>
            {showDate}
            <Message fromSelf={fromSelf}>
              <Bubble fromSelf={fromSelf}>
                <Text>{message.text}</Text>
                <Time>{formatTime(dateToCheck)}</Time>
              </Bubble>
            </Message>
          </React.Fragment>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #222240;
  scroll-behavior: smooth;
`;

const Empty = styled.div`
  margin: auto;
  color: #888;
  font-style: italic;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${(props) => (props.fromSelf ? "flex-end" : "flex-start")};
`;

const Bubble = styled.div`
  max-width: 60%;
  background-color: ${(props) =>
    props.fromSelf ? "#4e0eff" : "#262645"};
  color: #ede9e9ff;
  padding: 0.75rem 1rem 1.4rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px
    ${(props) =>
      props.fromSelf
        ? "rgba(78, 14, 255, 0.6)"
        : "rgba(38, 38, 69, 0.6)"};
  position: relative;
  word-wrap: break-word;
`;

const Text = styled.div`
  font-size: 1rem;
  line-height: 1.3;
`;

const Time = styled.span`
  position: absolute;
  left: 0.75rem;
  bottom: 0rem;
  font-size: 0.8rem;
  color: #686868;
  opacity: 0.88;
  white-space:wrap;
`;

const DateSeparator = styled.div`
  width: 100%;
  text-align: center;
  margin: 0.75rem 0;
  color: #bbb;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 1px;
  opacity: 0.9;
`;

