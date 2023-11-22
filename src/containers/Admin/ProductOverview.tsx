import {useState, useEffect} from 'react';
import PageLayout from '../../components/layout.tsx';
import {ChannelType} from '../../types/channel.types.ts';
import SetFetchApi from '../../utils/helper/SetFetchApi.tsx';
import CosmeticProductsTable from '../../components/CosmeticProductsTable.tsx';
import HairCareProductsTable from '../../components/HairCareProductsTable.tsx';

function ProductOverview({channel}: { channel: ChannelType }) {
    const [cosmeticData, setCosmeticData] = useState<any>(null);
    const [hairCareData, setHairCareData] = useState<any>(null);

    useEffect(() => {
        const getCosmetic = async () => {
            try {
                const apiUrl = 'http://localhost:3000/products?channel=COSMETIC';
                const responseData = await SetFetchApi(apiUrl);
                setCosmeticData(responseData);
            } catch (error) {
            }
        };

        const getHair = async () => {
            try {
                const apiUrl = 'http://localhost:3000/products?channel=HAIR_CARE';
                const responseData = await SetFetchApi(apiUrl);
                setHairCareData(responseData);
            } catch (error) {
            }
        };

        if (channel === 'COSMETIC') {
            getCosmetic();
        } else if (channel === 'HAIR_CARE') {
            getHair();
        }
    }, [channel]);

    return (
        <PageLayout>
            <div>
                {channel === 'COSMETIC' && cosmeticData && (
                    <CosmeticProductsTable products={cosmeticData}/>
                )}
                {channel === 'HAIR_CARE' && hairCareData && (
                    <HairCareProductsTable products={hairCareData}/>
                )}
            </div>
        </PageLayout>
    );
}

export default ProductOverview;
