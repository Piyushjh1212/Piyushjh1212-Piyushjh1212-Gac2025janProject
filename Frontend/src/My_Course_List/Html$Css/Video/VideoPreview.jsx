import React, { useContext, useEffect } from 'react';
import { GacContext } from '../../../Context/GacContext';
import './VideoPreview.css';

export default function VideoPreview() {
    const { showVideo } = useContext(GacContext);

    return (
        <div className="video-container">
            <video className="video-preview" src={showVideo} controls />
        </div>
    );
}
