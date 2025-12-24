import { useState, useCallback } from 'react';
import { MOCK_INVENTORY_PHARMACY, MOCK_INVENTORY_PHC, MOCK_DRUGS } from '../data/mockData';
import { useAuth } from './useAuth';
import type { InventoryItem } from '../types';

export const useInventory = () => {
    const { user } = useAuth();
    // Initialize with mock data based on role
    // In real app, this would be a Firestore listener
    const [inventory, setInventory] = useState<Record<string, InventoryItem>>(() => {
        if (user?.role === 'pharmacy') return MOCK_INVENTORY_PHARMACY;
        if (user?.role === 'phc') return MOCK_INVENTORY_PHC;
        return {};
    });

    const drugs = MOCK_DRUGS; // Acts as the "Drug Master List" cache

    const addToInventory = useCallback((drugId: string, quantity: number, threshold: number = 10, expiryDate?: string, batchNumber?: string) => {
        // Validation would go here
        
        const newItem: InventoryItem = {
            inventoryId: drugId, // Simple ID for MVP
            drugRef: `drugMasterList/${drugId}`,
            quantity,
            lowStockThreshold: threshold,
            lowStockAlert: quantity <= threshold,
            lastUpdated: new Date().toISOString(),
            expiryDate,
            batchNumber
        };

        setInventory(prev => ({
            ...prev,
            [drugId]: newItem
        }));
        
        // In real app: Write to Firestore
    }, []);

    const updateStock = useCallback((inventoryId: string, delta: number) => {
        setInventory(prev => {
            const item = prev[inventoryId];
            if (!item) return prev;
            
            const newQty = item.quantity + delta;
            return {
                ...prev,
                [inventoryId]: {
                    ...item,
                    quantity: newQty,
                    lowStockAlert: newQty <= item.lowStockThreshold,
                    lastUpdated: new Date().toISOString()
                }
            };
        });
        // In real app: Write to Firestore
    }, []);
    
    // Helper to get full drug details merged with inventory
    const getInventoryWithDetails = useCallback(() => {
        return Object.values(inventory).map(item => {
            const drugId = item.drugRef.split('/')[1];
            const drug = drugs[drugId];
            return { ...item, drugName: drug?.name || 'Unknown', drug };
        });
    }, [inventory, drugs]);

    return {
        inventory,
        addToInventory,
        updateStock,
        getInventoryWithDetails,
        drugs // Exposed for search
    };
};
