import styled from "styled-components";

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Inner = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1440px;
  padding: 16px;
`;

const Block = ({ children }) => {
  return (
    <BlockContainer>
      <Inner>{children}</Inner>
    </BlockContainer>
  );
};

export default Block;
