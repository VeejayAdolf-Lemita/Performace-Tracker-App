import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideNav extends Component {
  handleLinkClick = (event) => {
    const links = document.querySelectorAll('.ry_sidemenu-link-style1');
    links.forEach((link) => {
      link.classList.remove('w--current');
    });

    const sublinks = document.querySelectorAll('.ry_sidemenu-sublink-style1');
    sublinks.forEach((sublink) => {
      sublink.classList.remove('w--current');
    });

    event.currentTarget.classList.add('w--current');
  };

  render() {
    return (
      <div className='ry_sidebar-style1 div-block-27'>
        <div className='ry_sidebar-style1_top'>
          <div className='ry_side-menu-style1_container'>
            <Link
              to=''
              aria-current='page'
              className='ry_sidemenu-link-style1 w-inline-block w--current'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M12.92,58.71a30.76,30.76,0,0,1-3.72-.53,8.65,8.65,0,0,1-4.3-14c.4-.46.85-.89,1.28-1.33C18.45,30.57,30.83,18.41,42.91,6A9.79,9.79,0,0,1,57.18,6C69.44,18.6,82,31,94.45,43.35a8.82,8.82,0,0,1,2.42,9,8.1,8.1,0,0,1-6.57,6,26.56,26.56,0,0,1-3.14.29v2q0,12.72,0,25.46c0,6.75-4.14,11-10.89,11-4.49,0-9,0-13.47,0-2.8,0-3.69-.94-3.69-3.82q0-10.24,0-20.49c0-3.55-1.79-5.34-5.31-5.37-2.52,0-5,0-7.56,0-3.44,0-5.26,1.83-5.27,5.23Q41,83,41,93.31c0,2.85-.9,3.77-3.73,3.78-4.43,0-8.86,0-13.29,0-6.88,0-11-4.2-11-11q0-12.65,0-25.28Zm22.5,32.75V89.22c0-5.53,0-11.07,0-16.61,0-6.45,4.31-10.7,10.79-10.74,2.64,0,5.29,0,7.93,0a10.17,10.17,0,0,1,10.5,10.48c0,5.66,0,11.33,0,17v2.2h11c4.36,0,5.93-1.55,5.93-5.85q0-14.49,0-29c0-2.82.92-3.72,3.78-3.73a12.06,12.06,0,0,0,3.3-.08,4.4,4.4,0,0,0,2.65-1.85c.38-.87-.14-2.17-.39-3.25-.08-.36-.56-.63-.86-.93L53,9.8c-2.29-2.29-3.71-2.27-6.06.09L10,46.82c-.3.3-.77.57-.87.93-.27,1.08-.83,2.36-.47,3.24a4.63,4.63,0,0,0,2.62,1.91,9.14,9.14,0,0,0,2.92.08c3.47,0,4.23.76,4.23,4.21q0,14.67,0,29.35c0,2.75,1.5,4.77,4,4.87C26.7,91.59,30.94,91.46,35.42,91.46Z'
                    />
                  </svg>
                </div>
                <div>Dashboard</div>
              </div>
            </Link>
            <Link
              to='review'
              className='ry_sidemenu-link-style1 w-inline-block '
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M50.05,2.89q18,0,36.05,0c6.79,0,11,4.21,11,11q0,30.17,0,60.34c0,6.79-4.22,11-11,11-7.17,0-14.34,0-21.52.06a4.33,4.33,0,0,0-2.68,1.1c-3.07,2.91-6,5.95-9,8.93-2.32,2.32-3.4,2.33-5.68.06-3-3-6-6.11-9.14-9.07a4.08,4.08,0,0,0-2.53-1c-7.17-.08-14.35,0-21.52,0-6.91,0-11.09-4.21-11.09-11.13q0-30.08,0-60.15C2.91,7.07,7.07,2.89,14,2.89Q32,2.88,50.05,2.89Zm0,87.54c3.15-3.16,6.15-6.11,9.09-9.14a4.72,4.72,0,0,1,3.72-1.57c7.73.06,15.45,0,23.17,0,3.86,0,5.59-1.74,5.59-5.62V14c0-3.9-1.71-5.6-5.59-5.6H14.1c-4,0-5.67,1.68-5.67,5.7V74.05c0,4,1.7,5.7,5.69,5.7,7.72,0,15.44,0,23.16,0a4.57,4.57,0,0,1,3.57,1.49C43.8,84.25,46.8,87.22,50,90.43Z'
                    />
                    <path
                      className='cls-1'
                      d='M32.86,64.39c.74-4.35,1.43-8.7,2.26-13a2.77,2.77,0,0,0-.94-2.88c-3-2.82-5.89-5.73-8.84-8.58-1-.94-1.76-1.91-1.25-3.38s1.63-1.83,3-2c4.24-.58,8.49-1.17,12.71-1.88a2.74,2.74,0,0,0,1.7-1.32c1.92-3.69,3.74-7.44,5.55-11.18.62-1.27,1.32-2.43,2.9-2.45s2.39,1.2,3,2.53c1.79,3.68,3.57,7.38,5.49,11a3.14,3.14,0,0,0,2,1.43c4.22.72,8.47,1.29,12.71,1.9,1.31.18,2.58.71,2.67,2.08a4.41,4.41,0,0,1-1,3c-2.92,3.06-6,6-9,8.88a2.65,2.65,0,0,0-.9,2.74c.79,4.2,1.55,8.43,2.12,12.67a3.46,3.46,0,0,1-1,2.85,3.75,3.75,0,0,1-3.16.18c-3.76-1.77-7.43-3.74-11.07-5.76a3.16,3.16,0,0,0-3.5,0c-3.69,2.06-7.44,4-11.21,5.91A2.76,2.76,0,0,1,32.86,64.39Zm34-25.16c-1.55-.22-3.12-.42-4.69-.68-8.19-1.41-6,.37-9.73-6.9-.78-1.54-1.56-3.08-2.49-4.9-1.54,3.12-3,5.83-4.24,8.61a4,4,0,0,1-3.46,2.55c-3.09.35-6.16.89-9,1.32,2.15,2.31,4.27,4.67,6.48,6.94A3.82,3.82,0,0,1,41,50c-.63,3.13-1.08,6.3-1.65,9.74,3-1.59,5.77-2.94,8.41-4.46a4.21,4.21,0,0,1,4.64,0c2.65,1.51,5.39,2.86,8.35,4.41-.56-3.39-1-6.53-1.64-9.63a3.91,3.91,0,0,1,1.27-3.93C62.54,43.91,64.64,41.6,66.88,39.23Z'
                    />
                  </svg>
                </div>
                <div>Review</div>
              </div>
            </Link>
            <Link
              to='goals'
              className='ry_sidemenu-link-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M74.8,9.83c1.23-1.35,2.47-2.71,3.72-4,.91-1,1.91-1.76,3.38-1.25s1.89,1.72,2,3.18c.17,2.5.44,5,.69,7.63,2.64.24,5.19.51,7.74.69,1.39.1,2.51.5,3,1.92s-.11,2.37-1,3.27l-4.13,4c7.35,12.8,9,26.15,4.3,40.07a45.76,45.76,0,0,1-20.15,25,47.13,47.13,0,0,1-61.5-69.34C27.15,2.66,53.1-3,74.8,9.83Zm-4.21,4.11A41.54,41.54,0,1,0,78,80.69C94.55,65.44,94.25,42.6,85.9,29.44c-2.15,3.45-5.18,4.77-9.6,3.2C81,40.35,82.44,48,80.8,56.18A30.63,30.63,0,0,1,68,75.69,31.43,31.43,0,0,1,21.86,35.87,30.58,30.58,0,0,1,41.57,19.66c8.86-2.47,17.27-1.06,25.76,3.92C65.68,19.11,67.13,16.19,70.59,13.94Zm-4.37,16C57.16,22.05,41,21.29,30.67,32.63A25.93,25.93,0,1,0,69.35,67.16c9.85-11,7.33-26.37.59-33.39-2.11,2.14-4.15,4.35-6.34,6.4-1,1-1.11,1.63-.47,2.92,2.81,5.68,2.39,11.23-1.6,16.19A14,14,0,0,1,46.4,64.36a14,14,0,0,1-11-11.55A14,14,0,0,1,41.08,38c5-3.7,10.39-3.94,15.94-1.21.76.38,1.34.91,2.21,0C61.47,34.49,63.83,32.26,66.22,29.91ZM58.14,45.59c-1.93,2-3.8,3.89-5.7,5.78-1.51,1.51-3.15,1.71-4.35.58S47,49,48.57,47.46c1.88-1.9,3.79-3.76,5.75-5.7a9.24,9.24,0,0,0-11.88,2.63,9.36,9.36,0,0,0,13.1,13.08A9.21,9.21,0,0,0,58.14,45.59ZM86.64,21.1l-3.82-.29c-2.77-.24-3.48-1-3.72-3.76-.1-1.11-.2-2.21-.34-3.85-2.27,2.33-4.16,4.24-6,6.19a1.65,1.65,0,0,0-.43,1.13c.13,2.18.33,4.35.52,6.57,2.2.17,4.21.36,6.22.46a2.13,2.13,0,0,0,1.48-.43C82.5,25.28,84.38,23.36,86.64,21.1Z'
                    />
                  </svg>
                </div>
                <div>Goals</div>
              </div>
            </Link>
            <Link
              to='bonuses'
              className='ry_sidemenu-link-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M7.62,55.8c-4.74-.55-4.74-.55-4.74-5V33.65c0-2.59.68-3.28,3.26-3.29H33.68l.17-.37-1.54-1c-4-2.79-7.28-6.23-9-10.89a11.11,11.11,0,0,1,8.25-15A10.48,10.48,0,0,1,39.74,5a26.48,26.48,0,0,1,9.12,11.08L50,18.49c.42-.86.75-1.48,1-2.11A26.69,26.69,0,0,1,59.84,5.29c4.52-3.2,9.3-3.18,13.27,0a10.92,10.92,0,0,1,3.36,13.37A23.2,23.2,0,0,1,68,28.76a6,6,0,0,0-1.7,1.6h27.3c3,0,3.57.58,3.57,3.53V51.74c0,3.38-.34,3.73-3.77,3.9-.23,0-.47.07-1,.15V93.43c0,3.1-.56,3.68-3.59,3.68H11.15c-2.93,0-3.53-.6-3.53-3.56V55.8ZM47.5,92.28a8.47,8.47,0,0,0,.15-1.12c0-11.34,0-22.68,0-34,0-1.44-.67-1.54-1.79-1.54q-16,0-32,0c-.47,0-.94.09-1.45.14V92.28Zm40-36.51a7.43,7.43,0,0,0-1-.13c-10.9,0-21.81,0-32.72,0-1.49,0-1.5.75-1.49,1.83q0,16.63,0,33.27c0,.52.09,1,.13,1.55H87.54ZM47.42,50.84a2.2,2.2,0,0,0,.21-.61c0-4.66,0-9.32,0-14,0-1.2-.67-1.22-1.54-1.22H9a7,7,0,0,0-1.26.23V50.84ZM92.28,35.22a3.8,3.8,0,0,0-.67-.17c-12.63,0-25.27,0-37.9,0-1.23,0-1.39.57-1.39,1.58,0,4.35,0,8.71,0,13.06a6.9,6.9,0,0,0,.21,1.19H92.28Zm-44.89-5a2.91,2.91,0,0,0,.24-.56,7.06,7.06,0,0,0,0-.92A28.6,28.6,0,0,0,43,15.22a31.36,31.36,0,0,0-6-6.34A5.23,5.23,0,0,0,30,8.81a6.1,6.1,0,0,0-2.37,7.29,16.61,16.61,0,0,0,5.7,7.72A34.51,34.51,0,0,0,45.56,30,15.89,15.89,0,0,0,47.39,30.26Zm4.82,0A13.57,13.57,0,0,0,54.13,30,33.07,33.07,0,0,0,67.66,23a15.09,15.09,0,0,0,4.89-7.6c.68-2.8-.44-4.89-2.59-6.56a5.26,5.26,0,0,0-6.35-.3A18.47,18.47,0,0,0,60,11.34C56.21,15.19,54.16,20,53,25.21,52.61,26.79,52.48,28.42,52.21,30.25Z'
                    />
                  </svg>
                </div>
                <div>Bonuses</div>
              </div>
            </Link>
            <Link
              to='#'
              className='ry_sidemenu-link-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M50,88.38H12.91c-6,0-9.23-3.23-9.24-9.29,0-4.33,0-8.67,0-13a13.54,13.54,0,0,1,13.8-13.89c3.85,0,7.7.23,11.55.27a1.88,1.88,0,0,0,1.38-.76,13.74,13.74,0,0,1,12.37-6.46c4.76,0,9.53.06,14.29,0a13.86,13.86,0,0,1,12.54,6.5c.3.45,1.26.62,1.92.63,4.57.08,9.19-.36,13.69.19,6.42.8,11,6.52,11.07,13,.07,4.76,0,9.52,0,14.28,0,5.1-3.43,8.49-8.54,8.51C75.16,88.4,62.56,88.38,50,88.38ZM33.82,82.81H66.17v-1.9c0-7.6.11-15.2-.18-22.79-.18-4.53-3.63-7.38-8.22-7.42-4.94-.05-9.89,0-14.83,0-5.82,0-9.08,3.24-9.12,9.05,0,4.65,0,9.29,0,13.93Zm-5.62.12a4.32,4.32,0,0,0,.16-.73c0-7.72,0-15.44,0-23.15,0-1.24-.69-1.41-1.59-1.41-3.38,0-6.76-.14-10.13,0a7.84,7.84,0,0,0-7.51,7.64c-.15,4.94-.08,9.89,0,14.83a2.47,2.47,0,0,0,2.53,2.74C17.14,83,22.62,82.93,28.2,82.93Zm43.41,0c5.74,0,11.22,0,16.7,0,1.6,0,2.54-1.14,2.55-2.9,0-4.83.09-9.65,0-14.47a7.85,7.85,0,0,0-7.34-7.81c-3.48-.24-7-.07-10.49-.07-1,0-1.46.46-1.43,1.56.08,2.41,0,4.82,0,7.23Z'
                    />
                    <path
                      className='cls-1'
                      d='M33.9,27.46A16.09,16.09,0,1,1,49.58,43.81,16.07,16.07,0,0,1,33.9,27.46ZM50.06,17A10.67,10.67,0,1,0,60.64,27.81,10.63,10.63,0,0,0,50.06,17Z'
                    />
                    <path
                      className='cls-1'
                      d='M33.8,38.61A12,12,0,1,1,21.72,26.54,12.06,12.06,0,0,1,33.8,38.61Zm-18.59-.12A6.57,6.57,0,1,0,21.82,32,6.58,6.58,0,0,0,15.21,38.49Z'
                    />
                    <path
                      className='cls-1'
                      d='M90.23,38.53a12,12,0,1,1-12.15-12A12.06,12.06,0,0,1,90.23,38.53Zm-18.6.07A6.58,6.58,0,1,0,78.13,32,6.6,6.6,0,0,0,71.63,38.6Z'
                    />
                  </svg>
                </div>
                <div>People</div>
              </div>
              <div className='ry_sidemenu-link-style2_add'>
                <div className='ry_embed-style1 w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M50.15,62.42C60.78,50,71.14,37.9,81.52,25.81c3.81-4.44,7.3-5.2,10.46-2.35S94.7,29.69,91,34Q73.55,54.36,56.09,74.75c-4.21,4.9-7.75,4.9-11.87.08Q26.09,53.65,8,32.45c-2.29-2.68-2.62-5.29-1.13-7.8a5.85,5.85,0,0,1,6.79-2.81,10.35,10.35,0,0,1,4.17,3c9.86,11.39,19.63,22.86,29.43,34.3C48.13,60.13,49,61.14,50.15,62.42Z'
                    />
                  </svg>
                </div>
              </div>
            </Link>
            <Link
              to='members'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Members</div>
              </div>
            </Link>
            <Link
              to='teams'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Teams</div>
              </div>
            </Link>
            <div className='ry_sidemenu-link-style1 w-inline-block' onClick={this.handleLinkClick}>
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M53.43,46.65H92.06c4.39,0,5.27.92,5.15,5.35-.62,22.65-18.93,42.43-41.49,44.82C30,99.54,8,83,3.44,57.44-.9,33,16.55,8,41.12,3.73a62.34,62.34,0,0,1,7.73-.83c3.42-.17,4.58,1,4.58,4.42V46.65Zm-6.75-37C26.21,10.79,9.2,29.76,9.76,50.55,10.35,72.8,28.23,90.47,50.25,90.3A40.22,40.22,0,0,0,90.39,53.4H51.27c-3.55,0-4.59-1.06-4.59-4.67v-39Z'
                    />
                    <path
                      className='cls-1'
                      d='M77.64,39.92c-4.41,0-8.83,0-13.25,0-2.76,0-4-1.2-4-4q-.06-13.46,0-26.91c0-3.31,2-4.73,5.16-3.6,14.3,5.2,24.12,14.92,29.28,29.26C96,38,94.57,39.9,91.1,39.92,86.62,39.94,82.13,39.92,77.64,39.92ZM67.06,13.41V33.06H86.74A40.64,40.64,0,0,0,67.06,13.41Z'
                    />
                  </svg>
                </div>
                <div>Reports</div>
              </div>
              <div className='ry_sidemenu-link-style2_add'>
                <div className='ry_embed-style1 w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M50.15,62.42C60.78,50,71.14,37.9,81.52,25.81c3.81-4.44,7.3-5.2,10.46-2.35S94.7,29.69,91,34Q73.55,54.36,56.09,74.75c-4.21,4.9-7.75,4.9-11.87.08Q26.09,53.65,8,32.45c-2.29-2.68-2.62-5.29-1.13-7.8a5.85,5.85,0,0,1,6.79-2.81,10.35,10.35,0,0,1,4.17,3c9.86,11.39,19.63,22.86,29.43,34.3C48.13,60.13,49,61.14,50.15,62.42Z'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Link
              to='timesheets'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Timesheet</div>
              </div>
            </Link>
            <Link
              to='timeline'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Timeline</div>
              </div>
            </Link>
            <Link
              to='attendance'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Attendance</div>
              </div>
            </Link>
            <Link
              to='activity-level'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Activity Level</div>
              </div>
            </Link>
            <Link
              to='feedback'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>360° Feedback</div>
              </div>
            </Link>
            <Link
              to='#'
              className='ry_sidemenu-link-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='ry_icon-side-embed w-embed'>
                  <svg
                    id='Layer_1'
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                  >
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                    </defs>
                    <path
                      className='cls-1'
                      d='M47.78,36.66c17.2.42,30.63,4.91,41.27,16.08a81.88,81.88,0,0,1,6.07,8,3.3,3.3,0,0,1,.06,4A46.22,46.22,0,0,1,79.9,80.28c-1.67,1-3.35.78-4.27-.6s-.55-3.1,1.23-4.24A42.55,42.55,0,0,0,88.73,64.15a2.06,2.06,0,0,0,0-2.82C81.88,51.78,72.5,46.09,61.16,43.76,45.82,40.6,31.55,43.21,19.06,53c-2.91,2.3-5.17,5.42-7.76,8.14-1,1-.89,1.93-.05,3.11,6.26,8.83,14.83,14.21,25.17,16.91a52.5,52.5,0,0,0,21.32,1.15l.18,0c2.75-.34,4.18.4,4.46,2.32s-1.07,3-3.71,3.4C44.09,90,30.49,87.4,18.19,79.08A45.59,45.59,0,0,1,5,65.13a4,4,0,0,1,0-4.78c7.17-11.5,17.59-18.51,30.57-21.73A118.35,118.35,0,0,1,47.78,36.66Z'
                    />
                    <path
                      className='cls-1'
                      d='M60.5,77c-11.12,5.14-19.83,3.46-25.17-4.63A17.51,17.51,0,0,1,60.81,49c6,4.77,9.58,14.4,3.42,24,1.91,1.89,3.85,3.81,5.79,5.75,2.2,2.19,4.41,4.38,6.58,6.6,1.39,1.41,1.49,3.09.33,4.29s-2.91,1.19-4.4-.29q-5.55-5.49-11-11A11.21,11.21,0,0,1,60.5,77ZM49.9,74.45A11.73,11.73,0,1,0,38.16,62.72,11.78,11.78,0,0,0,49.9,74.45Z'
                    />
                    <path
                      className='cls-1'
                      d='M47.08,19.7c0-2.33,0-4.66,0-7,0-2,1.14-3.21,2.82-3.24a2.88,2.88,0,0,1,2.9,3.16q0,7,0,14c0,1.93-1.18,3.24-2.82,3.27s-2.88-1.33-2.91-3.37C47.06,24.23,47.08,22,47.08,19.7Z'
                    />
                    <path
                      className='cls-1'
                      d='M25.47,16.28a6.12,6.12,0,0,1,1.8,1.51c2.47,4.08,4.83,8.22,7.18,12.37a2.86,2.86,0,1,1-4.91,2.92c-2.45-4.16-4.88-8.32-7.22-12.55C21.18,18.46,22.59,16.2,25.47,16.28Z'
                    />
                    <path
                      className='cls-1'
                      d='M78.28,18.68a21.68,21.68,0,0,1-.9,2.27Q74,26.85,70.59,32.71c-1.09,1.87-2.61,2.4-4.15,1.54s-1.9-2.51-.85-4.34c2.3-4,4.64-8,7-12.07.8-1.38,2.07-2,3.47-1.4C77,16.86,77.58,18,78.28,18.68Z'
                    />
                  </svg>
                </div>
                <div>Productivity</div>
              </div>
            </Link>
            <Link
              to='insights'
              className='ry_sidemenu-sublink-style1 w-inline-block'
              onClick={this.handleLinkClick}
            >
              <div className='sidemenu-link-style1_left'>
                <div className='div-block-381' />
                <div>Insights</div>
              </div>
            </Link>
          </div>
        </div>
        <div className='ry_sidebar-style1_bottom'>
          <div className='username-diiv'>
            <div className='rb-sidebar-avatar'>
              <img
                src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647ef7a875a3469fe6149589_nav_02.svg'
                loading='lazy'
                alt=''
              />
            </div>
            <div className='rb-teacher-details'>
              <div className='rb-sidebar-teacher-name'>John Smith</div>
              <div className='rb-sidebar-teacher-email'>john.smith@email.com</div>
            </div>
          </div>
          <Link
            to='settings'
            className='ry_sidemenu-link-style1 w-inline-block'
            onClick={this.handleLinkClick}
          >
            <div className='sidemenu-link-style1_left'>
              <div className='ry_icon-side-embed w-embed'>
                <svg
                  id='Layer_1'
                  data-name='Layer 1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 100 100'
                >
                  <defs>
                    <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                  </defs>
                  <path
                    className='cls-1'
                    d='M50,97.05a32,32,0,0,1-4,0,8.61,8.61,0,0,1-7.53-8.79c0-1.41-.43-2.17-1.79-2.43a1.78,1.78,0,0,1-.52-.18c-2.29-1.51-4.07-1.38-6.3.67-2.92,2.68-7.57,2.16-10.61-.57-1.68-1.52-3.29-3.13-4.82-4.81a8.37,8.37,0,0,1,.18-11.78c1.22-1.22,1.17-2.07.62-3.61-1-2.63-2.13-4-5.28-4.2-3.89-.2-6.82-4-6.95-8-.07-1.9,0-3.8,0-5.7,0-5.41,3.48-9.06,8.87-9.18,1.41,0,2.18-.43,2.43-1.8a1.57,1.57,0,0,1,.19-.51c1.5-2.29,1.39-4.07-.67-6.3-2.65-2.87-2.19-7.49.45-10.47a59,59,0,0,1,5.06-5.07,8.42,8.42,0,0,1,11.79.4c1.1,1.11,2,1.43,3.27.5a.53.53,0,0,1,.17-.08c2.77-.62,4.07-2,4.23-5.19.19-3.88,4-6.82,8-7,1.9-.06,3.8,0,5.7,0,5.42,0,9.06,3.46,9.19,8.86,0,1.41.42,2.18,1.79,2.44a1.34,1.34,0,0,1,.52.18c2.28,1.49,4.06,1.4,6.3-.67,2.86-2.64,7.48-2.18,10.46.45a60.64,60.64,0,0,1,5.08,5.06A8.42,8.42,0,0,1,85.35,31c-1.09,1.11-1.43,2-.49,3.27a.36.36,0,0,1,.07.17c.67,2.72,2,4.09,5.19,4.24,3.89.18,6.82,4,7,8,.07,1.9,0,3.8,0,5.7,0,5.41-3.48,9.06-8.87,9.19-1.41,0-2.18.42-2.43,1.78a1.55,1.55,0,0,1-.19.52c-1.5,2.29-1.38,4.07.67,6.3,2.69,2.93,2.16,7.57-.57,10.61-1.47,1.64-3,3.2-4.66,4.7A8.45,8.45,0,0,1,69,85.36c-1.11-1.11-2-1.42-3.27-.49a.45.45,0,0,1-.17.08c-2.73.65-4.08,2-4.23,5.19-.18,3.82-3.94,6.74-7.86,6.94-1.16.06-2.33,0-3.49,0ZM25.11,17.28a12.45,12.45,0,0,0-2.43,1.32c-1.42,1.27-2.75,2.63-4.05,4-1.46,1.56-1.42,3.11.08,4.71.79.85,1.64,1.66,2.46,2.48a3,3,0,0,1,.6,3.69c-1.19,2.74-2.33,5.51-3.43,8.29a2.82,2.82,0,0,1-2.72,2.07c-1.23,0-2.46,0-3.68,0-2.35.1-3.47,1.24-3.51,3.57,0,1.72,0,3.44,0,5.15a3.18,3.18,0,0,0,3.39,3.51c1.22.06,2.45,0,3.68,0a2.89,2.89,0,0,1,2.86,2.14c1.06,2.73,2.17,5.45,3.36,8.12a3.08,3.08,0,0,1-.59,3.85c-.88.86-1.78,1.7-2.6,2.61a3,3,0,0,0,0,4.45q2,2.14,4.16,4.16a3,3,0,0,0,4.45,0c.91-.82,1.75-1.72,2.61-2.59a3.08,3.08,0,0,1,3.85-.58c2.61,1.18,5.26,2.31,8,3.3a3,3,0,0,1,2.3,3.12c0,1.23,0,2.46,0,3.68a3.11,3.11,0,0,0,3.33,3.18q2.76.08,5.52,0a3.1,3.1,0,0,0,3.34-3.16c.1-1.28,0-2.57,0-3.86a2.88,2.88,0,0,1,2.1-2.89c2.78-1.1,5.55-2.24,8.29-3.43a3,3,0,0,1,3.69.62c.86.87,1.7,1.77,2.61,2.59a3,3,0,0,0,4.45,0c1.44-1.33,2.83-2.73,4.16-4.16s1.33-3.06-.07-4.59c-.79-.85-1.63-1.66-2.47-2.47a3.07,3.07,0,0,1-.62-3.84c1.19-2.68,2.3-5.39,3.36-8.13a2.88,2.88,0,0,1,2.84-2.15c1.23,0,2.46,0,3.68,0,2.24-.11,3.37-1.27,3.42-3.48,0-1.78,0-3.56,0-5.34a3.14,3.14,0,0,0-3.3-3.4c-1.22-.07-2.45,0-3.68,0a3,3,0,0,1-3-2.23c-1-2.73-2.19-5.44-3.37-8.12a3,3,0,0,1,.57-3.69c.87-.87,1.77-1.7,2.6-2.61a3.06,3.06,0,0,0,0-4.59c-1.3-1.38-2.65-2.73-4-4a3,3,0,0,0-4.58,0c-.9.83-1.74,1.73-2.61,2.59a3,3,0,0,1-3.7.54c-2.68-1.18-5.38-2.31-8.12-3.36a3,3,0,0,1-2.21-3c0-1.22,0-2.45,0-3.68a3.15,3.15,0,0,0-3.43-3.27c-1.84,0-3.68,0-5.52,0a3.09,3.09,0,0,0-3.25,3.07c-.09,1.09,0,2.2,0,3.3,0,2.43-.46,3-2.72,3.71a37.25,37.25,0,0,0-5.3,2.05c-4.79,2.51-4.53,2.08-8.09-1.41A20.79,20.79,0,0,0,25.11,17.28Z'
                  />
                  <path
                    className='cls-1'
                    d='M50.17,29.48A20.53,20.53,0,1,1,29.48,49.79,20.64,20.64,0,0,1,50.17,29.48ZM65,49.93A15,15,0,1,0,50.08,65,15.09,15.09,0,0,0,65,49.93Z'
                  />
                </svg>
              </div>
              <div>Settings</div>
            </div>
          </Link>
          <Link
            to='/'
            className='ry_sidemenu-link-style1 w-inline-block'
            onClick={this.handleLinkClick}
          >
            <div className='sidemenu-link-style1_left'>
              <div className='ry_icon-side-embed w-embed'>
                <svg
                  id='Layer_1'
                  data-name='Layer 1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 100 100'
                >
                  <defs>
                    <style dangerouslySetInnerHTML={{ __html: '.cls-1{fill:CurrentColor;}' }} />
                  </defs>
                  <path
                    className='cls-1'
                    d='M7.43,50.49c0-9.82,0-19.64,0-29.46C7.48,13.47,12,8,19.18,6.84a16.55,16.55,0,0,1,2.73-.16H54.78c8.67,0,14.47,5.82,14.49,14.51,0,1.94,0,3.88,0,5.82a3.43,3.43,0,1,1-6.84,0c0-2.11,0-4.23,0-6.34-.06-4.24-2.87-7.15-7.08-7.16q-16.95-.06-33.91,0a6.73,6.73,0,0,0-7.07,6.62c-.05.57-.05,1.14-.05,1.71q0,28.68,0,57.37a13.84,13.84,0,0,0,.28,3.22,6.67,6.67,0,0,0,6.57,5q17.2.08,34.42,0A6.76,6.76,0,0,0,62.4,80.6c.05-2.11,0-4.22,0-6.34,0-2.34,1.4-3.86,3.43-3.86s3.43,1.54,3.4,3.89a60.44,60.44,0,0,1-.34,9,13.27,13.27,0,0,1-13,11q-17.55.12-35.1,0A13.54,13.54,0,0,1,7.52,81.82c-.07-.91-.09-1.83-.09-2.74Q7.42,64.79,7.43,50.49Z'
                  />
                  <path
                    className='cls-1'
                    d='M85.22,46.82c-1.53-1.5-3.08-3-4.59-4.49-1.83-1.84-2-3.94-.45-5.4s3.5-1.22,5.28.55c2.27,2.25,4.45,4.6,6.81,6.76a9,9,0,0,1,.06,12.85c-2.39,2.21-4.61,4.59-6.92,6.88-1.76,1.74-3.83,1.89-5.29.43s-1.3-3.49.44-5.28c1.47-1.51,3-3,4.44-4.51a2.74,2.74,0,0,0,.09-.48H46.32c-.58,0-1.15,0-1.72,0C42.42,54,41.06,52.68,41,50.74s1.37-3.34,3.65-3.46c.57,0,1.14,0,1.71,0H85Z'
                  />
                </svg>
              </div>
              <div>Sign Out</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
