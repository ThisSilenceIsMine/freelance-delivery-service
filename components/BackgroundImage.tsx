import styled  from '@emotion/styled';
import Image from 'next/image';

export interface Props {
  src: string;
  alt?: string;
  [prop: string]: any;
}

export const BackgroundImage = (imageProps: Props) => {
  return (
    <BgWrap>
      <Image
        {...imageProps}
        layout="fill"
        objectFit="cover"
        quality={100}

      />
    </BgWrap>
  );
};

const BgWrap = styled.div`
  filter: brightness(60%) blur(4px);
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
`;