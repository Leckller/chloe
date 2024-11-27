import styled from "styled-components";
import media from "../../utils/media";

export const StyledProfile = styled.main`

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Section das inforações do usuário
  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    // Banner
    article:nth-child(1) img{
      object-fit: contain;
      width: 100%;
    }

    // Photo
    article:nth-child(2) {
      display: flex;
      justify-content: space-between;
      align-items: start;
      width: 100%;
      padding: 8px;
      
      & img { 
        transform: translateY(-100px);

        ${media.sm`
          transform: translateY(-50px);
        `}

        border-radius: 99999px;
        width: 35%;
        max-width: 200px;
        height: 35%;
        max-height: 200px;
      }  

      & button {
        border: black 1px solid;
        padding: 8px;
        border-radius: 16px;
      }

    }
    
    // Name and Address
    article:nth-child(3) {
        transform: translateY(-100px);
        ${media.sm`
          transform: translateY(-50px);
        `}
        padding: 8px;

        & h3::before {
          content: '@'
        }
        & h3 {
          color: gray;
        }

      }

    // Description
    article:nth-child(4) {
      transform: translateY(-100px);
        ${media.sm`
          transform: translateY(-50px);
        `}
        padding: 8px;
    }
    
    // Followers
    article:nth-child(5) {
      display: flex;
      gap: 16px;
      color: gray;
      & span {
        color: black;
      }

      transform: translateY(-100px);
        ${media.sm`
          transform: translateY(-50px);
        `}
        padding: 8px;
    }

  }
  
  // Section dos posts do usuário  
  section:nth-child(2) {}
`