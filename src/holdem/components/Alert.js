import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(0,0,0,0.75)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Alert(props) {

    const [showModal, setModal] = useState(true);

    const handleClose = () => {
        setModal(false);
        props.callback();
    }

    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography style={{ color: 'rgb(255,255,255)' }} id="modal-modal-title" variant="h6" component="h2">
                    Järjestelmä ilmoittaa:
                </Typography>
                <Typography style={{ color: 'rgb(255,255,255)' }} id="modal-modal-description" sx={{ mt: 2 }}>
                    {props.message}
                </Typography>
            </Box>
        </Modal>
    )
}