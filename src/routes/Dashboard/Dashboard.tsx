import { useEffect, useState } from 'react';
import { IoWallet } from 'react-icons/io5'
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';

// Data
import { useAppSelector } from '../../app/hooks';
import { selectWallet, WalletState } from '../../app/slices/walletSlice';

import { useAppDispatch } from '../../app/hooks';
import { getWalletInfoASync, incrementBalance, reduceBalance, History } from '../../app/slices/walletSlice';

import './stylesheets/Dashboard.scss';

type DashboardProps = {}

export default function Dashboard(props: DashboardProps) {
    const dispatch = useAppDispatch();
    const wallet: WalletState = useAppSelector(selectWallet);
    const [options, setOptions] = useState<object>(
        {
            grid: { top: 8, right: 8, bottom: 24, left: 36 },
            xAxis: {
                type: 'category',
                data: [],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [],
                    type: 'line',
                    smooth: true,
                },
            ],
            tooltip: {
                trigger: 'axis',
            },
        }
    );


    // Inital data
    useEffect(() => {
        const getWalletInfo = async () => {
            await dispatch(getWalletInfoASync({ userId: '1' })).unwrap();
        }
        getWalletInfo();
    }, []);

    // History change
    useEffect(() => {
        let xData: Array<any> = [], yData: Array<any> = [];
        wallet.history.forEach((item: History) => {
            xData.push(item.date);
            yData.push(item.balance);
        })
        setOptions({
            grid: { top: 8, right: 8, bottom: 24, left: 36 },
            xAxis: {
                type: 'category',
                data: xData,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: yData,
                    type: 'line',
                    smooth: true,
                },
            ],
            tooltip: {
                trigger: 'axis',
            },
        })
    }, [wallet.history]);

    const topUp = () => {
        dispatch(incrementBalance(10000.00));
    }

    const withdraw = () => {
        dispatch(reduceBalance(5000.00));
    }

    return (
        <div className="dashboard-container">
            <div className="container-title">
                <div><h2>Dashboard</h2></div>
                <div className="welcome"><span className="welcome-txt">Hello,Guy. Welcome to LonWallet</span></div>
            </div>
            <div className="dashboard-item-row">
                <Card cardClassName="balance-card">
                    <div className="balance-icons"><IoWallet /></div>
                    <div>
                        <div className="balance-title">
                            <span>Your Balance</span>
                        </div>
                        <div className="balance-value">AUD: {wallet.balance}</div>
                    </div>
                    <div className="balance-btn-panel">
                        <Button buttonType="primary" buttonSize="normal" onClick={topUp}>Top Up</Button>
                        <Button buttonClassName="balance-btn" buttonType="grey" buttonSize="normal" onClick={withdraw}>Withdraw</Button>
                    </div>
                </Card>
                <div className="dashboard-item-row">
                    <Card cardClassName="hsitory-chart-card">
                        <div className="hsitory-chart-title">Balance History</div>
                        <div>
                            <ReactECharts option={options} />
                        </div>
                    </Card>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}