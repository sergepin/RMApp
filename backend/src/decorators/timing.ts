/**
 * Method decorator that measures and logs the execution time of GraphQL resolvers
 * @param target - The prototype of the class
 * @param propertyKey - The name of the method being decorated
 * @param descriptor - The property descriptor for the method
 */
export function timing(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const startTime = performance.now();
        
        try {
            const result = await originalMethod.apply(this, args);
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            
            console.log(`DECORATOR - ⏱️  ${propertyKey} executed in ${executionTime.toFixed(2)}ms`);
            
            return result;
        } catch (error) {
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            
            console.error(`DECORATOR - ❌ ${propertyKey} failed after ${executionTime.toFixed(2)}ms:`, error);
            throw error;
        }
    };

    return descriptor;
}
