import React, {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {PageHeader} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {GET_BOARD_BY_ID_REQUEST_ACTION} from "../../reducers/board";
import {RootState} from "../../reducers";

const BoardDetail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {board} = useSelector((state: RootState) => state.board)


    useEffect(() => {
        dispatch(GET_BOARD_BY_ID_REQUEST_ACTION(Number(params.boardId)));
    }, [params])

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => {navigate(-1)}}
                title={`title`}
                subTitle="This is a subtitle"
            />
            <h1>{params.boardId}</h1>
        </>
    )
}

export default BoardDetail;