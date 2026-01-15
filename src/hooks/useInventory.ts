import { useCallback } from 'react';
import { MOCK_DRUGS } from '../data/mockData';
import { useAuth } from './useAuth';
import { useMockData } from '../context/MockDataContext';
import type { InventoryItem } from '../types';

export const useInventory = () => {
    const { user } = useAuth();
    const { 
        pharmacyInventory, 
        phcInventory, 
        addToPharmacyInventory, 
        addToPHCInventory,
        updatePharmacyStock,
        updatePHCStock
    } = useMockData();

    // Select the correct inventory based on role
    const inventory = user?.role === 'phc' ? phcInventory : pharmacyInventory;
    
    const drugs = MOCK_DRUGS; 

    const addToInventory = useCallback((drugId: string, quantity: number, threshold: number = 10, expiryDate?: string, batchNumber?: string) => {
        const newItem: InventoryItem = {
            inventoryId: drugId,
            drugRef: `drugMasterList/${drugId}`,
            quantity,
            lowStockThreshold: threshold,
            lowStockAlert: quantity <= threshold,
            lastUpdated: new Date().toISOString(),
            expiryDate,
            batchNumber
        };

        if (user?.role === 'phc') {
            addToPHCInventory(newItem);
        } else {
            addToPharmacyInventory(newItem);
        }
    }, [user?.role, addToPharmacyInventory, addToPHCInventory]);

    const updateStock = useCallback((inventoryId: string, delta: number) => {
        if (user?.role === 'phc') {
            updatePHCStock(inventoryId, delta);
        } else {
            updatePharmacyStock(inventoryId, delta);
        }
    }, [user?.role, updatePHCStock, updatePharmacyStock]);
    
    // Helper to get full drug details merged with inventory
    const getInventoryWithDetails = useCallback(() => {
        return Object.values(inventory).map(item => {
            const drugId = item.drugRef.split('/')[1];
            const drug = drugs[drugId];
            return { ...item, drugName: drug?.name || 'Unknown', drug };
        });
    }, [inventory, drugs]);

    return {
        inventory, // Exposed raw if needed
        addToInventory,
        updateStock,
        getInventoryWithDetails,
        drugs 
    };
};
