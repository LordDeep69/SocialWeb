import React, { useContext } from 'react'
import './footer.scss'
import { AppContext } from '../router/Router'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const {user: {userDispatch, userLogin: {user}}, posts, setPosts, friends, setFriends} = useContext(AppContext);

    const handleNewPost = () =>
    {
        console.log('Has dado click a nuevo Post.');
    } 

    const navigate = useNavigate();

    const handleNavigate = (ruta) => 
    {
        console.log('Has navegado a ', ruta);
        navigate(ruta);
    }

  return (
    <footer className='footer'>
        
        <div className='containerFooter'>
            <svg className='figureFooter' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428 57" fill="none"><path d="M0 0C0 0 90 0 132.5 0C186.239 0 170.5 45.5 214 45.5C257.5 45.5 240.261 -1.66825e-05 294 0C333.5 1.22622e-05 428 0 428 0V57H0V0Z" fill="#FF7674"/></svg>
        
            <svg className='circleFooter' xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none"><circle cx="32.5" cy="32" r="32" fill="#FF7674"/>  </svg>

            <svg onClick={() => handleNavigate('/')} className='homeFooter' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.6889 12.3888L12.8901 0.380076C12.4354 -0.126692 11.5619 -0.126692 11.1071 0.380076L0.308346 12.3888C0.152911 12.5612 0.0508845 12.7751 0.014672 13.0045C-0.0215404 13.2339 0.00962142 13.4689 0.104369 13.6809C0.296347 14.1144 0.7259 14.393 1.19985 14.393H3.59958V22.7991C3.59958 23.1176 3.72599 23.4231 3.95101 23.6483C4.17603 23.8735 4.48122 24 4.79944 24H8.39904C8.71727 24 9.02246 23.8735 9.24748 23.6483C9.47249 23.4231 9.59891 23.1176 9.59891 22.7991V17.9956H14.3984V22.7991C14.3984 23.1176 14.5248 23.4231 14.7498 23.6483C14.9748 23.8735 15.28 24 15.5982 24H19.1978C19.5161 24 19.8213 23.8735 20.0463 23.6483C20.2713 23.4231 20.3977 23.1176 20.3977 22.7991V14.393H22.7974C23.0298 14.394 23.2574 14.3273 23.4526 14.2011C23.6478 14.0748 23.802 13.8945 23.8965 13.682C23.991 13.4695 24.0217 13.2341 23.9848 13.0045C23.948 12.7749 23.8452 12.5609 23.6889 12.3888Z" fill="#F8F8F8"/></svg>

            <svg className = 'searchFooter' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M17.1901 15.4782L23.6458 21.934C23.8727 22.1611 24.0001 22.469 24 22.79C23.9999 23.111 23.8723 23.4189 23.6452 23.6458C23.4181 23.8727 23.1102 24.0001 22.7892 24C22.4682 23.9999 22.1604 23.8723 21.9335 23.6452L15.4778 17.1893C13.5479 18.6841 11.1211 19.3875 8.69104 19.1565C6.26097 18.9255 4.01018 17.7773 2.39656 15.9457C0.782936 14.114 -0.0723147 11.7364 0.00479537 9.29655C0.0819054 6.85668 1.08558 4.53783 2.81165 2.81172C4.53771 1.08561 6.85651 0.0819075 9.29632 0.00479549C11.7361 -0.0723165 14.1137 0.782955 15.9453 2.39662C17.7769 4.01028 18.925 6.26113 19.156 8.69126C19.387 11.1214 18.6836 13.5483 17.1889 15.4782H17.1901ZM9.60045 16.7993C11.5099 16.7993 13.3412 16.0408 14.6914 14.6905C16.0416 13.3403 16.8001 11.509 16.8001 9.59949C16.8001 7.68997 16.0416 5.85866 14.6914 4.50843C13.3412 3.15819 11.5099 2.39964 9.60045 2.39964C7.69098 2.39964 5.85971 3.15819 4.50951 4.50843C3.15932 5.85866 2.40078 7.68997 2.40078 9.59949C2.40078 11.509 3.15932 13.3403 4.50951 14.6905C5.85971 16.0408 7.69098 16.7993 9.60045 16.7993Z" fill="#F8F8F8"/></svg>


            <svg className='campFooter' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22.8533C12.4199 22.8437 12.8229 22.6858 13.1377 22.4076C13.4525 22.1295 13.6587 21.7489 13.72 21.3333H10.2133C10.2763 21.7602 10.4922 22.1497 10.8208 22.4293C11.1495 22.7089 11.5685 22.8596 12 22.8533Z" fill="#F8F8F8"/><path d="M21.9 18.7533L21.6734 18.5533C21.0303 17.9804 20.4675 17.3234 20 16.6C19.4895 15.6017 19.1835 14.5115 19.1 13.3933V10.1C19.0973 9.69995 19.0616 9.30082 18.9934 8.90665C17.8641 8.67454 16.8498 8.05933 16.122 7.16517C15.3943 6.27101 14.9979 5.15285 15 3.99999V3.57999C14.304 3.23744 13.5561 3.01219 12.7867 2.91332V2.07332C12.7867 1.83728 12.6929 1.6109 12.526 1.44399C12.3591 1.27709 12.1327 1.18332 11.8967 1.18332C11.6607 1.18332 11.4343 1.27709 11.2674 1.44399C11.1005 1.6109 11.0067 1.83728 11.0067 2.07332V2.94665C9.28384 3.18969 7.70708 4.04782 6.56751 5.36261C5.42794 6.6774 4.80252 8.36008 4.8067 10.1V13.3933C4.7232 14.5115 4.41722 15.6017 3.9067 16.6C3.44728 17.3216 2.89349 17.9785 2.26003 18.5533L2.03336 18.7533V20.6333H21.9V18.7533Z" fill="#F8F8F8"/><path d="M20 7.33332C21.8409 7.33332 23.3333 5.84094 23.3333 3.99999C23.3333 2.15904 21.8409 0.666656 20 0.666656C18.159 0.666656 16.6667 2.15904 16.6667 3.99999C16.6667 5.84094 18.159 7.33332 20 7.33332Z" fill="#F8F8F8"/></svg>


            <span onClick={() => handleNavigate('/NewPost')} className="material-symbols-outlined addFooter">add</span>

            <span className='story__friend'>

                <figure className='contentFriend'>

                    <img className='contentFriend__img' src={user.image} alt="picture" />
                    

                </figure>
            </span>
            </div>

  </footer>
  )
}

export default Footer;